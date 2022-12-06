export interface IRequestUploadResponse {
  path_map: Record<string, Attachment>
}

export type Attachment = {
  local_path: string
  url: string
}
