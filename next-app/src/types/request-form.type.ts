import { UploadFile } from "antd";
import { Dayjs } from "dayjs";

import { ListItem } from "./5m1e-setting.type";

export interface ISubmitRequestFormParam {
  request_process_name: string;
  data_value: RequestData;
  user_uuid: string;
  line_id: number;
  request_process_id: number;
  current_state_id: number;
  action_id: number;
  action_user_uuid: string;
  transition_id: number;
  email_list: string[];
  action_note: string;
}

export interface ISubmitChangeRequestFormParam {
  request_process_name: string;
  data_value: RequestChangeData;
  user_uuid: string;
  line_id: number;
  request_process_id: number;
  current_state_id: number;
  action_id: number;
  action_user_uuid: string;
  transition_id: number;
  email_list: string[];
  action_note: string;
}

export interface IUpdateRequestFormParam extends ISubmitRequestFormParam {
  request_id: string;
}

export interface IUpdateChangeRequestFormParam
  extends ISubmitChangeRequestFormParam {
  request_id: string;
}

export interface IRequestForm {
  category: string;
  item: ListItem;
  detail: string;
  detail_other: string;
  full_detail: string;
  product: string;
  line: number;
  process: number;
  machine: string;
  part: string;
  attachments: UploadFile[];
  attachmentUrlList?: string[];
  note: string;
}

export interface IChangeRequestForm {
  category: string;
  item: ListItem;
  detail: string;
  detail_other: string;
  full_detail: string;
  act_person: string;
  kpi: string[];
  product: string;
  line: number;
  process: number;
  machine: string;
  part: string;
  act_time: Dayjs;
  act_result: string;
  resp_person: string;
  attachments: UploadFile[];
  attachmentUrlList?: string[];
  note: string;
}

export interface IRequestFilterForm {
  requestType?: string;
  category?: string;
  kpi?: string;
  product?: string;
  part?: string;
  line?: string;
  process?: string;
  machine?: string;
  informer?: string;
}

export interface ISelectProblemRequestForm {
  requestProblemId: string;
}

export type RequestData = {
  problem_request_id: string | null;
  category: string;
  item: string;
  detail: string;
  detailOther: string;
  fullDetail: string;
  product: string;
  lineId: number;
  processId: number;
  machine: string;
  partNo: string;
  attachmentList: string[];
  supporterList?: string[];
  confirmationList?: string[];
  note: string;
};

export type RequestChangeData = {
  problem_request_id: string | null;
  category: string;
  item: string;
  detail: string;
  detailOther: string;
  fullDetail: string;
  actPerson: string;
  kpi: string[];
  product: string;
  lineId: number;
  processId: number;
  machine: string;
  partNo: string;
  actTime: string;
  actResult: string;
  respPerson: string;
  attachmentList: string[];
  supporterList?: string[];
  confirmationList?: string[];
  note: string;
};
