import {
  getAllRequest,
  updateRequestAttachment,
  updateRequestFormValue,
  updateChangeRequestFormValue,
} from "@/actions";
import { Update5M1EReportForm } from "@/components/forms";
import { FileUploadedKey } from "@/constant";
import { is5M1ERequest, is5M1EChangeRequest } from "@/functions";
import { RequestConfigStore, RequestProblemFormStore } from "@/store";
import { RequestChangePointFormStore } from "@/store/request-change-point-form.store";
import { IRequestForm, IChangeRequestForm } from "@/types/request-form.type";
import { _5M1EChangeRequest, _5M1ERequest } from "@/types/request.type";
import { IRequestUploadResponse } from "@/types/upload.type";
import { Button, message } from "antd";
import { FC, useMemo, useState } from "react";
import { AiFillEdit, AiFillSave } from "react-icons/ai";
// import { useEffectOnce } from "usehooks-ts";
import { ActionHistory } from "./action-history";
import { ActionPanel } from "./action-panel";

interface IProps {
  request: _5M1ERequest | _5M1EChangeRequest;
}

export const RequestDetailPanel: FC<IProps> = ({ request }: IProps) => {
  const { canEditRequest } = RequestConfigStore();
  const requestProblemFormStore = RequestProblemFormStore();
  const requestChangePointFormStore = RequestChangePointFormStore();

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const formStore = useMemo(
    () =>
      is5M1ERequest(request)
        ? requestProblemFormStore
        : requestChangePointFormStore,
    [requestProblemFormStore, requestChangePointFormStore, request]
  );

  const handleSave = async (form: IRequestForm) => {
    if (is5M1ERequest(request)) {
      const attachmentToUploadList: any[] = [];
      let attachmentList: string[] = [];
      form.attachments.forEach((attachment) => {
        if (attachment.uid.includes(FileUploadedKey)) {
          if (attachment.url) {
            attachmentList.push(attachment.url);
          }
        } else {
          attachmentToUploadList.push(attachment.originFileObj);
        }
      });
      if (attachmentToUploadList.length > 0) {
        let requestUpload: IRequestUploadResponse;
        try {
          requestUpload = await updateRequestAttachment(attachmentToUploadList);
        } catch (error) {
          console.error(error);
          message.error(`Cannot upload attachments: ref ${error}`);
          throw error;
        }
        const uploadedAttachmentUrlList = Object.keys(
          requestUpload.path_map
        ).map((key) => requestUpload.path_map[key].url);
        attachmentList = [...attachmentList, ...uploadedAttachmentUrlList];
        console.log(attachmentList, uploadedAttachmentUrlList);
      }
      await updateRequestFormValue(request, {
        ...form,
        attachmentUrlList: attachmentList,
      });
      await getAllRequest();
      setIsEditing(false);
    } else {
      return;
    }
  };

  const handleSaveChange = async (form: IChangeRequestForm) => {
    if (is5M1EChangeRequest(request)) {
      const attachmentToUploadList: any[] = [];
      let attachmentList: string[] = [];
      form.attachments.forEach((attachment) => {
        if (attachment.uid.includes(FileUploadedKey)) {
          if (attachment.url) {
            attachmentList.push(attachment.url);
          }
        } else {
          attachmentToUploadList.push(attachment.originFileObj);
        }
      });
      if (attachmentToUploadList.length > 0) {
        let requestUpload: IRequestUploadResponse;
        try {
          requestUpload = await updateRequestAttachment(attachmentToUploadList);
        } catch (error) {
          console.error(error);
          message.error(`Cannot upload attachments: ref ${error}`);
          throw error;
        }
        const uploadedAttachmentUrlList = Object.keys(
          requestUpload.path_map
        ).map((key) => requestUpload.path_map[key].url);
        attachmentList = [...attachmentList, ...uploadedAttachmentUrlList];
        console.log(attachmentList, uploadedAttachmentUrlList);
      }
      await updateChangeRequestFormValue(request, {
        ...form,
        attachmentUrlList: attachmentList,
      });
      await getAllRequest();
      setIsEditing(false);
    } else {
      return;
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <>
      {canEditRequest(
        request?.actionList?.[request.actionList?.length - 1]
      ) && (
        <div className="flex justify-end mb-4">
          {!isEditing ? (
            <Button
              onClick={() => {
                setIsEditing(true);
              }}
            >
              <div className="flex items-center">
                <AiFillEdit />
                <div className="ml-2">Edit</div>
              </div>
            </Button>
          ) : null}
        </div>
      )}
      {is5M1ERequest(request) ? (
        <Update5M1EReportForm
          request={request}
          formStore={formStore}
          isEditing={isEditing}
          onFinish={handleSave}
          onReset={handleCancel}
        >
          {isEditing && (
            <div className="flex justify-end mb-4">
              <Button htmlType="reset">
                <div className="flex items-center">
                  <div className="ml-2">Cancel</div>
                </div>
              </Button>
              <Button htmlType="submit">
                <div className="flex items-center">
                  <AiFillSave />
                  <div className="ml-2">Save</div>
                </div>
              </Button>
            </div>
          )}
        </Update5M1EReportForm>
      ) : (
        <Update5M1EReportForm
          request={request}
          formStore={formStore}
          isEditing={isEditing}
          onFinish={handleSaveChange}
          onReset={handleCancel}
        >
          {isEditing && (
            <div className="flex justify-end mb-4">
              <Button htmlType="reset">
                <div className="flex items-center">
                  <div className="ml-2">Cancel</div>
                </div>
              </Button>
              <Button htmlType="submit">
                <div className="flex items-center">
                  <AiFillSave />
                  <div className="ml-2">Save</div>
                </div>
              </Button>
            </div>
          )}
        </Update5M1EReportForm>
      )}
      {request.actionList.length > 1 && <ActionHistory request={request} />}
      {!isEditing && (
        <div className="flex justify-end">
          <ActionPanel request={request} />
        </div>
      )}
    </>
  );
};
