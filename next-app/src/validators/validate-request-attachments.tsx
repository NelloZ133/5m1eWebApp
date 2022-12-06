import { message, UploadFile } from "antd"

export function validateProblemAttachment(file: UploadFile): boolean {
  const { type, size, url } = file

  if (!type || !size) {
    if (url) {
      return true
    }

    console.error(`Error while uploading file, ref type: ${type}, size: ${size}`, file)
    message.error(
      `Error while uploading file, ref type: ${type}, size: ${size}`
    )
    return false
  }

  const unavailableType = ['application/zip', 'application/x-tar', 'application/gzip', 'application/vnd.rar']
  const isAllowType = !unavailableType.includes(type);
  if (!isAllowType) {
    message.error(
      "File type not support, file must not be ZIP/TAR/GZIP/RAR."
    );
  }

  const isLessThan3M = size / 1024 / 1024 < 3;
  if (!isLessThan3M) {
    message.error("File must less than 3MB.");
  }

  return isAllowType && isLessThan3M;
}