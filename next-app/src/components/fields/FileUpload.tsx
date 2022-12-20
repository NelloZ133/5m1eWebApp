import environment from "@/util/environment";
import { Upload } from "antd";
import {
  UploadChangeParam,
  UploadFile,
  UploadListType,
} from "antd/lib/upload/interface";
import { FC } from "react";
import { UploadButton } from "../buttons";

interface IProps {
  value?: any;
  listType?: UploadListType;
  fileList?: UploadFile[];
  onChange?: (files: UploadFile[]) => void;
  validator?: (file: UploadFile) => boolean;
}
const FileUpload: FC<IProps> = ({
  listType,
  fileList,
  validator,
  onChange,
  ...props
}: IProps) => {
  const onFileUploaded = (file: UploadChangeParam<UploadFile>) => {
    const attachmentList = file?.fileList ?? [];
    const validatedFileList = attachmentList.filter((v: UploadFile) =>
      validator !== undefined ? validator(v) : true
    );
    onChange?.(validatedFileList);
  };
  return (
    <Upload
      {...props}
      action={`${environment.API_URL}/static/temp`}
      listType={listType}
      fileList={fileList}
      onChange={onFileUploaded}
      supportServerRender
      showUploadList
    >
      {UploadButton}
    </Upload>
  );
};

export default FileUpload;
export { FileUpload };
