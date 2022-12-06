export interface IRequestConfigResponse {
  action: Record<string, RequestAction>,
  activity: Record<string, RequestActivity>,
  state: Record<string, RequestState>,
  transition: Record<string, RequestTransition>
}

export type RequestAction = {
  id?: number,
  name: string
  description: string
  type: string
  request_process: string
  user_group: string
}

export type RequestActivity = {
  id?: number
  name: string
  description: string
  type: string
  request_process: string
}

export type RequestState = {
  id?: number
  name: string
  description: string
  type: string
  request_process: string
}

export type RequestTransition = {
  id?: number
  current_state_id: string
  next_state_id: string
  action_id: string
  activity_id: string
  description: string
}
