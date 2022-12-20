import { RequestTransition } from "@/types/request-config.type";
import { _5M1ERequestAction } from "@/types/request.type";

export interface IBaseRequestConfigState {
  canEditRequest: (action: _5M1ERequestAction) => boolean;
  isRequestProblemFinished: (transition: RequestTransition) => boolean;
  isShowActionNote: (transition: RequestTransition) => boolean;
  isShowMailingList: (transition: RequestTransition) => boolean;
  isShowSelectSupporter: (transition: RequestTransition) => boolean;
  isShowSelectConfirmation: (transition: RequestTransition) => boolean;
  shouldPromptModal: (transition: RequestTransition) => boolean;
}
