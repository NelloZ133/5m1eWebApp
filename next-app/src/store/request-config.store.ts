import create from "zustand";
import { _5M1ESettingStore } from "./5m1e-setting.store";
import { IBaseRequestConfigState } from "./interface/base-request-config.interface";
import { IRequestConfigState } from "./interface/request-config.interface";
import { IRequestFlowConfigState } from "./interface/request-flow-config.interface";
import { RequestConfigSlice } from "./slices/request-config.slice";
import { RequestFlowConfigSlice } from "./slices/request-flow-config.slice";
import { UserStore } from "./user.store";

export const RequestConfigStore = create<
  IBaseRequestConfigState & IRequestConfigState & IRequestFlowConfigState
>((...args) => ({
  ...RequestConfigSlice(...args),
  ...RequestFlowConfigSlice(...args),

  canEditRequest(action) {
    const [set, get] = args;
    const { user } = UserStore.getState();
    return (
      user?.user_uuid === action.user_uuid &&
      get().EditableTransitionNameList.includes(
        get().state[action?.current_state_id]?.name
      )
    );
  },

  shouldPromptModal(transition) {
    const [set, get] = args;
    const isShowActionNote = get().isShowActionNote(transition);
    const isShowMailingList = get().isShowMailingList(transition);
    const isShowSelectSupporter = get().isShowSelectSupporter(transition);
    const isShowSelectConfirmation = get().isShowSelectConfirmation(transition);

    return (
      isShowActionNote ||
      isShowMailingList ||
      isShowSelectSupporter ||
      isShowSelectConfirmation
    );
  },

  isRequestProblemFinished(transition) {
    const [set, get] = args;
    const { canCreateChangePointRequest } = _5M1ESettingStore.getState();
    return (
      canCreateChangePointRequest() &&
      get().GoToSubmitChangePointActionNameList.includes(
        get().action[transition?.action_id]?.name
      )
    );
  },

  isShowActionNote(transition) {
    const [set, get] = args;
    return get().PromptActionNoteActionNameList.includes(
      get().action[transition?.action_id]?.name
    );
  },

  isShowMailingList(transition) {
    const [set, get] = args;
    return get().PromptMailActionNameList.includes(
      get().action[transition?.action_id]?.name
    );
  },

  isShowSelectSupporter(transition) {
    const [set, get] = args;
    return get().PromptSelectSupporterActionNameList.includes(
      get().action[transition?.action_id]?.name
    );
  },

  isShowSelectConfirmation(transition) {
    const [set, get] = args;
    return get().PromptSelectConfirmationActionNameList.includes(
      get().action[transition?.action_id]?.name
    );
  },
}));
