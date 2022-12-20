import { IRequestForm, IChangeRequestForm } from "@/types/request-form.type";
import { Checkbox, Form, Input, Radio, DatePicker, UploadFile } from "antd";
import { FC, useEffect, useState } from "react";
import {
  FileUpload,
  Select,
  DebounceSelectPart,
  DebounceSelectMachine,
  DebounceSelectProduct,
  DebounceSelectUser,
} from "../fields";
import { RequestProblemFormStore, _5M1ESettingStore } from "@/store";
import { useForm } from "antd/lib/form/Form";
import { validateProblemAttachment } from "@/validators";
import TextArea from "antd/lib/input/TextArea";
import { _5M1ERequest, _5M1EChangeRequest } from "@/types/request.type";
import {
  DefaultItemDetail,
  DefaultListItem,
  FileUploadedKey,
  ItemDetailOther,
} from "@/constant";
import environment from "@/util/environment";
import { IRequestChangePointFormState } from "@/store/interface/request-change-point-form.interface";
import { IRequestProblemFormState } from "@/store/interface/request-problem-form.interface";
import { is5M1ERequest, is5M1EChangeRequest } from "@/functions";

interface IProps {
  formStore: IRequestProblemFormState | IRequestChangePointFormState;
  children?: React.ReactNode;
  request: _5M1ERequest | _5M1EChangeRequest;
  isEditing?: boolean;
  onFinish?: (form: any) => void;
  onReset?: () => void;
}

const Update5M1EReportForm: FC<IProps> = ({
  formStore,
  children,
  request,
  isEditing,
  onFinish,
  onReset,
}: IProps) => {
  const {
    getProblemListItemById,
    getChangePointListItemById,
    getItemDetailById,
  } = _5M1ESettingStore();
  const {
    selectedCategory,
    selectedProductId,
    selectedProcessId,
    selectedItemId,
    selectedLineId,
    selectedItemDetailId,

    categoryList,
    kpiList,
    availableLineList,
    availableCategoryItemList,
    availableItemDetailList,
    availableProcessList,

    setSelectedCategory,
    setSelectedItemId,
    setSelectedLineId,
    setSelectedProcessId,
    setSelectedProductId,
    setSelectedItemDetailId,

    reset,
  } = formStore;

  const [form] = useForm<IRequestForm | IChangeRequestForm>();
  const [attachmentList, setAttachmentList] = useState<UploadFile[]>([]);
  const [detailOtherInput, setDetailOtherInput] = useState<string>("");

  useEffect(() => {
    setRequestToForm();
    return () => {
      reset();
    };
  }, [reset]);

  useEffect(() => {
    if (isEditing) {
      setRequestToForm();
    }
  }, [isEditing]);
  const request_r: _5M1ERequest | _5M1EChangeRequest = request;
  const setRequestToForm = () => {
    if (is5M1ERequest(request)) {
      const reportProblemForm: IRequestForm = {
        category: request.request_data_value.category,
        kpi: request.request_data_value.kpi,
        note: request.request_data_value.note,
        machine: request.request_data_value.machine,
        attachments: [],
        attachmentUrlList: request.request_data_value.attachmentList,
        detail:
          +request.request_data_value.detailId !== -1
            ? getItemDetailById(+request.request_data_value.detailId) ??
              DefaultItemDetail
            : ItemDetailOther,
        detail_other: request.request_data_value.detailOther,
        full_detail: request.request_data_value.fullDetail,
        part: request.request_data_value.partId,
        item:
          (request.request_problem_no
            ? getProblemListItemById(+request.request_data_value.itemId)
            : getChangePointListItemById(+request.request_data_value.itemId)) ??
          DefaultListItem,
        line: +request.request_data_value.lineId,
        process: +request.request_data_value.processId,
        product: request.request_data_value.productId,
      };

      setDetailOtherInput(request.request_data_value.detailOther);
      setSelectedCategory(reportProblemForm.category);
      setSelectedItemId(reportProblemForm.item.list_item_id);
      setSelectedItemDetailId(reportProblemForm.detail.item_detail_id);
      setSelectedLineId(reportProblemForm.line);
      setSelectedProductId(reportProblemForm.product);
      setAttachmentList(
        request.request_data_value.attachmentList.map<UploadFile>(
          (attachment, index) => {
            const isUrl = attachment.startsWith("http");
            return {
              uid: `${FileUploadedKey}-${index}`,
              name: attachment,
              status: "done",
              url: isUrl ? attachment : `${environment.API_URL}${attachment}`,
            };
          }
        )
      );

      Object.entries(reportProblemForm).forEach((entries) => {
        const [key, value] = entries;
        form.setFieldValue(key, value);
      });
    } else if (is5M1EChangeRequest(request_r)) {
      const reportChangeForm: IChangeRequestForm = {
        category: request_r.request_data_value.category,
        kpi: request_r.request_data_value.kpi,
        note: request_r.request_data_value.note,
        machine: request_r.request_data_value.machine,
        attachments: [],
        attachmentUrlList: request_r.request_data_value.attachmentList,
        detail:
          +request_r.request_data_value.detailId !== -1
            ? getItemDetailById(+request_r.request_data_value.detailId) ??
              DefaultItemDetail
            : ItemDetailOther,
        detail_other: request_r.request_data_value.detailOther,
        full_detail: request_r.request_data_value.fullDetail,
        act_person: request_r.request_data_value.actPerson,
        part: request_r.request_data_value.partId,
        act_time: request_r.request_data_value.actTime,
        act_result: request_r.request_data_value.actResult,
        resp_person: request_r.request_data_value.respPerson,
        item:
          (request_r.request_problem_no
            ? getProblemListItemById(+request_r.request_data_value.itemId)
            : getChangePointListItemById(
                +request_r.request_data_value.itemId
              )) ?? DefaultListItem,
        line: +request_r.request_data_value.lineId,
        process: +request_r.request_data_value.processId,
        product: request_r.request_data_value.productId,
      };

      setDetailOtherInput(request_r.request_data_value.detailOther);
      setSelectedCategory(reportChangeForm.category);
      setSelectedItemId(reportChangeForm.item.list_item_id);
      setSelectedItemDetailId(reportChangeForm.detail.item_detail_id);
      setSelectedLineId(reportChangeForm.line);
      setSelectedProductId(reportChangeForm.product);
      setAttachmentList(
        request_r.request_data_value.attachmentList.map<UploadFile>(
          (attachment, index) => {
            const isUrl = attachment.startsWith("http");
            return {
              uid: `${FileUploadedKey}-${index}`,
              name: attachment,
              status: "done",
              url: isUrl ? attachment : `${environment.API_URL}${attachment}`,
            };
          }
        )
      );

      Object.entries(reportChangeForm).forEach((entries) => {
        const [key, value] = entries;
        form.setFieldValue(key, value);
      });
    }
  };

  const handleInputChanged = (event: any) => {
    form.setFieldValue("detail_other", event.currentTarget.value);
  };
  const handleFormReset = () => {
    setRequestToForm();
    onReset?.();
  };
  const handleFormValuesChange = () => {
    const itemDetail = form.getFieldValue("detail");
    setSelectedItemDetailId(itemDetail?.item_detail_id ?? null);

    const category = form.getFieldValue("category");
    if (category !== selectedCategory) {
      setSelectedCategory(category);
      form.setFieldValue("detail", null);
      form.setFieldValue("item", null);
    }

    const product = form.getFieldValue("product");
    if (product !== selectedProductId) {
      setSelectedProductId(product);
      form.setFieldValue("line", null);
      form.setFieldValue("process", null);
      form.setFieldValue("machine", null);
      form.setFieldValue("part", null);
    }

    const line = form.getFieldValue("line");
    if (line !== selectedLineId) {
      setSelectedLineId(line);
      form.setFieldValue("process", null);
      form.setFieldValue("machine", null);
      form.setFieldValue("part", null);
    }

    const process = form.getFieldValue("process");
    if (process !== selectedProcessId) {
      setSelectedProcessId(process);
      form.setFieldValue("machine", null);
      form.setFieldValue("part", null);
    }

    const item = form.getFieldValue("item");
    if (item !== selectedItemId) {
      setSelectedItemId(item?.list_item_id);
    }
  };

  useEffect(() => {
    setSelectedItemDetailId(null);
  }, [selectedCategory, selectedItemId]);
  if (is5M1EChangeRequest(request)) {
    return (
      <Form
        form={form}
        disabled={!isEditing}
        scrollToFirstError
        onChange={handleFormValuesChange}
        onReset={handleFormReset}
        onFinish={(v) => {
          // console.log(v);
          onFinish?.({
            ...v,
            attachments: attachmentList,
            detail_other: detailOtherInput,
          });
        }}
      >
        {children}
        <div className="grid gap-4 grid-cols-4">
          {categoryList().length ? (
            <Form.Item
              label="Category"
              name="category"
              rules={[{ required: true, message: "Please select category" }]}
              required
            >
              <Radio.Group>
                {categoryList().map((cat, idx) => (
                  <Radio.Button key={`category-${idx}`} value={cat}>
                    {cat}
                  </Radio.Button>
                ))}
              </Radio.Group>
            </Form.Item>
          ) : null}
          {availableCategoryItemList().length ? (
            <Form.Item
              label="List"
              name="item"
              rules={[{ required: true, message: "Please select list item" }]}
              required
            >
              <Radio.Group>
                {availableCategoryItemList().map((cat, idx) => (
                  <Radio.Button key={`item-${idx}`} value={cat}>
                    {cat.list_item_name}
                  </Radio.Button>
                ))}
              </Radio.Group>
            </Form.Item>
          ) : null}
          {availableItemDetailList().length ? (
            <Form.Item
              label="Detail"
              name="detail"
              rules={[{ required: true, message: "Please specify detail" }]}
              required
            >
              <Radio.Group>
                {availableItemDetailList().map((itemDetail, idx) => (
                  <Radio key={`detail-${idx}`} value={itemDetail}>
                    {itemDetail.item_detail_id === -1 ? (
                      <div className="flex items-center">
                        <div className="mr-2">{itemDetail.item_detail}</div>
                        {selectedItemDetailId === -1 ? (
                          <Input
                            placeholder="Detail..."
                            required
                            value={detailOtherInput}
                            onChange={handleInputChanged}
                          />
                        ) : null}
                      </div>
                    ) : (
                      itemDetail.item_detail
                    )}
                  </Radio>
                ))}
              </Radio.Group>
            </Form.Item>
          ) : selectedItemId === 42 ? (
            <>
              <Form.Item
                label="Line"
                name="line"
                rules={[{ required: true, message: "Please select line" }]}
                required
              >
                <Select
                  items={availableLineList()}
                  placeholder="select line..."
                  valueKey="id"
                  labelKey="line_name"
                  onChange={handleFormValuesChange}
                />
              </Form.Item>
              <Form.Item label="Note" name="note">
                <TextArea
                  className="mx-4"
                  style={{ height: 120, resize: "none" }}
                  placeholder="Input note here..."
                />
              </Form.Item>
            </>
          ) : null}
          <Form.Item label="More detail" name="more-detail">
            <TextArea
              className="mx-4"
              style={{ height: 120, resize: "none" }}
              placeholder="Input more detail here..."
            />
          </Form.Item>
          <Form.Item
            label="Who"
            name="act-person"
            rules={[{ required: true, message: "Please identify who's doing" }]}
            required
          >
            <DebounceSelectUser
              placeholder="type to search"
              allowClear={true}
              onChange={handleFormValuesChange}
            />
          </Form.Item>
          <Form.Item
            label="When"
            name="act-time"
            rules={[
              { required: true, message: "Please identify when it occurs" },
            ]}
            required
          >
            <DatePicker
              showTime={{ format: "HH:mm" }}
              format="YYYY-MM-DD HH:mm"
            />
          </Form.Item>
          <Form.Item
            label="Action Result"
            name="act-result"
            rules={[
              {
                required: true,
                message: "Please select the action result",
              },
            ]}
          >
            <Radio.Group>
              <Radio value="ok">OK</Radio>
              <Radio value="ng">NG</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Responsible Person"
            name="resp-person"
            rules={[
              {
                required: true,
                message: "Please identify in-charge person",
              },
            ]}
            required
          >
            <DebounceSelectUser
              placeholder="type to search"
              allowClear={true}
              onChange={handleFormValuesChange}
            />
          </Form.Item>
          <Form.Item
            label="KPI"
            name="kpi"
            rules={[{ required: true, message: "Please specify KPI" }]}
            required
          >
            <Checkbox.Group>
              {kpiList().map((cat, idx) => (
                <Checkbox key={`kpi-${idx}`} value={cat}>
                  {cat}
                </Checkbox>
              ))}
            </Checkbox.Group>
          </Form.Item>
          <Form.Item
            label="Product"
            name="product"
            rules={[{ required: true, message: "Please select product" }]}
            required
          >
            <DebounceSelectProduct
              placeholder="type to search"
              allowClear={true}
              onChange={handleFormValuesChange}
            />
          </Form.Item>
          <Form.Item
            label="Line"
            name="line"
            rules={[{ required: true, message: "Please select line" }]}
            required
          >
            <Select
              items={availableLineList()}
              placeholder="select line..."
              valueKey="id"
              labelKey="line_name"
              onChange={handleFormValuesChange}
            />
          </Form.Item>
          <Form.Item label="Process" name="process">
            <Select
              items={availableProcessList()}
              placeholder="will be shown after select line"
              valueKey="id"
              labelKey="process_name"
              onChange={handleFormValuesChange}
            />
          </Form.Item>
          <Form.Item label="Machine" name="machine">
            <DebounceSelectMachine
              placeholder="type to search"
              allowClear={true}
              onChange={handleFormValuesChange}
            />
          </Form.Item>
          <Form.Item label="Part" name="part">
            <DebounceSelectPart
              placeholder="type to search"
              allowClear={true}
              onChange={handleFormValuesChange}
            />
          </Form.Item>
          <Form.Item label="Attachment" name="attachments">
            <FileUpload
              listType="picture-card"
              fileList={attachmentList}
              onChange={setAttachmentList}
              validator={validateProblemAttachment}
            />
          </Form.Item>
          <Form.Item label="Note" name="note">
            <TextArea
              className="mx-4"
              style={{ height: 120, resize: "none" }}
              placeholder="Input note here..."
            />
          </Form.Item>
        </div>
      </Form>
    );
  } else {
    return (
      <Form
        form={form}
        disabled={!isEditing}
        scrollToFirstError
        onChange={handleFormValuesChange}
        onReset={handleFormReset}
        onFinish={(v) => {
          // console.log(v);
          onFinish?.({
            ...v,
            attachments: attachmentList,
            detail_other: detailOtherInput,
          });
        }}
      >
        {children}
        <div className="grid gap-4 grid-cols-4">
          {categoryList().length ? (
            <Form.Item
              label="Category"
              name="category"
              rules={[{ required: true, message: "Please select category" }]}
              required
            >
              <Radio.Group>
                {categoryList().map((cat, idx) => (
                  <Radio.Button key={`category-${idx}`} value={cat}>
                    {cat}
                  </Radio.Button>
                ))}
              </Radio.Group>
            </Form.Item>
          ) : null}
          {availableCategoryItemList().length ? (
            <Form.Item
              label="List"
              name="item"
              rules={[{ required: true, message: "Please select list item" }]}
              required
            >
              <Radio.Group>
                {availableCategoryItemList().map((cat, idx) => (
                  <Radio.Button key={`item-${idx}`} value={cat}>
                    {cat.list_item_name}
                  </Radio.Button>
                ))}
              </Radio.Group>
            </Form.Item>
          ) : null}
          {availableItemDetailList().length ? (
            <Form.Item
              label="Detail"
              name="detail"
              rules={[{ required: true, message: "Please specify detail" }]}
              required
            >
              <Radio.Group>
                {availableItemDetailList().map((itemDetail, idx) => (
                  <Radio key={`detail-${idx}`} value={itemDetail}>
                    {itemDetail.item_detail_id === -1 ? (
                      <div className="flex items-center">
                        <div className="mr-2">{itemDetail.item_detail}</div>
                        {selectedItemDetailId === -1 ? (
                          <Input
                            placeholder="Detail..."
                            required
                            value={detailOtherInput}
                            onChange={handleInputChanged}
                          />
                        ) : null}
                      </div>
                    ) : (
                      itemDetail.item_detail
                    )}
                  </Radio>
                ))}
              </Radio.Group>
            </Form.Item>
          ) : null}
          <Form.Item label="More detail" name="more-detail">
            <TextArea
              className="mx-4"
              style={{ height: 120, resize: "none" }}
              placeholder="Input more detail here..."
            />
          </Form.Item>
          <Form.Item
            label="Product"
            name="product"
            rules={[{ required: true, message: "Please select product" }]}
            required
          >
            <DebounceSelectProduct
              placeholder="type to search"
              allowClear={true}
              onChange={handleFormValuesChange}
            />
          </Form.Item>
          <Form.Item
            label="Line"
            name="line"
            rules={[{ required: true, message: "Please select line" }]}
            required
          >
            <Select
              items={availableLineList()}
              placeholder="select line..."
              valueKey="id"
              labelKey="line_name"
              onChange={handleFormValuesChange}
            />
          </Form.Item>
          <Form.Item label="Process" name="process">
            <Select
              items={availableProcessList()}
              placeholder="will be shown after select line"
              valueKey="id"
              labelKey="process_name"
              onChange={handleFormValuesChange}
            />
          </Form.Item>
          <Form.Item label="Machine" name="machine">
            <DebounceSelectMachine
              placeholder="type to search"
              allowClear={true}
              onChange={handleFormValuesChange}
            />
          </Form.Item>
          <Form.Item label="Part" name="part">
            <DebounceSelectPart
              placeholder="type to search"
              allowClear={true}
              onChange={handleFormValuesChange}
            />
          </Form.Item>
          <Form.Item label="Attachment" name="attachments">
            <FileUpload
              listType="picture-card"
              fileList={attachmentList}
              onChange={setAttachmentList}
              validator={validateProblemAttachment}
            />
          </Form.Item>
          <Form.Item label="Note" name="note">
            <TextArea
              className="mx-4"
              style={{ height: 120, resize: "none" }}
              placeholder="Input note here..."
            />
          </Form.Item>
        </div>
      </Form>
    );
  }
};

export default Update5M1EReportForm;
export { Update5M1EReportForm };
