import axiosInstance from "@/lib/axios";
import { IRequestUploadResponse } from "@/types/upload.type";

export async function updateRequestAttachment(
  files: File[]
): Promise<IRequestUploadResponse> {
  const formData = new FormData();
  files.forEach((file) => formData.append("files", file));

  const { data } = await axiosInstance.post<IRequestUploadResponse>(
    `request/upload`,
    formData
  );

  return data;
}
