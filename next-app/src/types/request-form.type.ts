import { UploadFile } from "antd"
import { ItemDetail, ListItem } from "./5m1e-setting.type"

export interface ISubmitRequestFormParam {
  request_process_name: string
  data_value: RequestData
  user_uuid: string
  line_id: number
  request_process_id: number
  current_state_id: number
  action_id: number
  action_user_uuid: string
  transition_id: number
  email_list: string[]
  action_note: string
}

export interface IUpdateRequestFormParam extends ISubmitRequestFormParam{
  request_id: string
}

export interface IRequestForm {
  category: string
  item: ListItem
  detail: ItemDetail
  detail_other: string
  kpi: string[]
  product: number
  line: number
  process: number
  machine: string
  part: string
  attachments: UploadFile[]
  attachmentUrlList?: string[]
  note: string
}

export interface IRequestFilterForm {
  requestType?: string
  category?: string
  kpi?: string
  topic?: string
  part?: string
  line?: string
  informer?: string
  manager?: string
}

export interface ISelectProblemRequestForm {
  requestProblemId: string
}

export type RequestData = {
  problem_request_id: string | null
  category: string
  itemId: number
  detailId: number
  detailOther: string
  kpi: string[]
  productId: number
  lineId: number
  processId: number
  machine: string
  partId: string
  attachmentList: string[]
  supporterList?: string[]
  confirmationList?: string[]
  note: string
}
