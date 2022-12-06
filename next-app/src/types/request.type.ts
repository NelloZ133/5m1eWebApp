import { RequestData } from "./request-form.type"

export interface I5M1ERequestListResponse {
  action_created_at: string
  action_id: number
  action_updated_at: string
  current_state_id: number
  data_created_at: string
  data_updated_at: string
  is_active: boolean | null
  is_complete: boolean | null
  is_locked: boolean | null
  line_id: number
  req_created_at: string
  req_updated_at: string
  request_action_id: number
  request_change_no: string | null
  request_data_id: number
  request_data_value: RequestData
  request_id: string
  request_problem_no: string | null
  request_process_id: number
  transition_id: number
  email_list: string
  user_uuid: string
  action_user_uuid: string
  note: string
}

export type _5M1ERequest = {
  action_id: number
  current_state_id: number
  data_created_at: string
  data_updated_at: string
  is_active: boolean | null
  is_complete: boolean | null
  is_locked: boolean | null
  line_id: number
  req_created_at: string
  req_updated_at: string
  request_action_id: number
  request_change_no: string | null
  request_data_id: number
  request_data_value: RequestData
  request_id: string
  request_problem_no: string | null
  request_process_id: number
  transition_id: number
  email_list: string
  user_uuid: string
  action_user_uuid: string
  note: string
  actionList: _5M1ERequestAction[]
}

export type _5M1ERequestSelect = {
  request_no: string
  request_id: string
}

export type _5M1ERequestAction = {
  action_created_at: string
  action_id: number
  action_user_uuid: string
  action_updated_at: string
  current_state_id: number
  data_created_at: string
  data_updated_at: string
  is_active: boolean | null
  is_complete: boolean | null
  is_locked: boolean | null
  line_id: number
  transition_id: number
  user_uuid: string
  note: string
}
