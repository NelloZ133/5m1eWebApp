import { ItemDetail, ListItem } from "./types/5m1e-setting.type"
import { _5M1ERequestSelect } from "./types/request.type"

export const FilterRequestType = [
  "All",
  "Problem",
  "Change Point"
]
export const SubmitProblemActionName = 'Submit problem'
export const SubmitChangePointActionName = 'Submit change point'
export const RequestProblemName = '5M1E Problem Report'
export const RequestChangePointName = '5M1E Change Point Report'
export const FileUploadedKey = 'Uploaded'
export const KPI_LIST = ['Safety', 'Quality', 'Cost', 'Delivery']

export const RequestProblemIdParamName = 'requestProblemId'

export const PositionMapToPoint: Record<string, number> = {
  'OP': 1,
  'LL': 2,
  'TL': 3,
  'MGR': 4,
  'FM': 5,
  'FD': 6
}

export const ItemDetailOther: ItemDetail = {
  item_detail_id: -1, item_detail: 'Other'
}
export const DefaultItemDetail: ItemDetail = {
  item_detail_id: -1, item_detail: ''
}
export const DefaultListItem: ListItem = {
  request_process_id: -1, list_item_id: -1, list_item_name: '',
}

export const DefaultRequestProblemItem: _5M1ERequestSelect = {
  request_no: 'Create without problem request',
  request_id: '-1'
}