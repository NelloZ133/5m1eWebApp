import { IRequestConfigResponse, RequestAction, RequestActivity, RequestState, RequestTransition } from "@/types/request-config.type";

export interface IRequestConfigState {
  action: Record<string, RequestAction>,
  activity: Record<string, RequestActivity>,
  state: Record<string, RequestState>,
  transition: Record<string, RequestTransition>

  actionList: () => RequestAction[]
  activityList: () => RequestActivity[]
  stateList: () => RequestState[]
  transitionList: () => RequestTransition[]

  setRequestConfig: (requestConfig: IRequestConfigResponse) => void

  getActionByName: (name: string) => RequestAction | undefined
  getTransitionByActionId: (id: number) => RequestTransition | undefined
  getTransitionByName: (name: string) => RequestTransition | undefined
  getFilteredTransitionByCurrentStateId: (currentStateId: number) => RequestTransition[]
}