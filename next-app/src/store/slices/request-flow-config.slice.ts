import { StateCreator } from "zustand";
import { IRequestFlowConfigState } from "../interface/request-flow-config.interface";

export const RequestFlowConfigSlice: StateCreator<IRequestFlowConfigState> = (
  set,
  get
) => ({
  PromptActionNoteActionNameList: [
    "Approve problem",
    "Reject problem",
    "Cancel problem",
    "Approve change point",
    "Reject change point",
    "Cancel change point",
    "Select supporter",
    "Request confirmation",
  ],
  PromptMailActionNameList: ["Submit problem", "Submit change point"],
  PromptSelectSupporterActionNameList: ["Select supporter"],
  PromptSelectConfirmationActionNameList: ["Request confirmation"],
  EditableTransitionNameList: ["During Confirm", "During Action"],
  GoToSubmitChangePointActionNameList: [
    "Select supporter",
    "Not select supporter",
  ],
});
