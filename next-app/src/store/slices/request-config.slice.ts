import { MapKeyValueDictToType } from "@/util";
import { StateCreator } from "zustand";
import { IRequestConfigState } from "../interface/request-config.interface";

export const RequestConfigSlice: StateCreator<IRequestConfigState> = (
  set,
  get
) => ({
  action: {},
  activity: {},
  state: {},
  transition: {},

  actionList() {
    return MapKeyValueDictToType(get().action);
  },

  activityList() {
    return MapKeyValueDictToType(get().activity);
  },

  stateList() {
    return MapKeyValueDictToType(get().state);
  },

  transitionList() {
    return MapKeyValueDictToType(get().transition);
  },

  setRequestConfig(requestConfig) {
    set({
      ...requestConfig,
    });
  },

  getActionByName(name) {
    return get()
      .actionList()
      .find((action) => action.name === name);
  },

  getTransitionByActionId(id) {
    return get()
      .transitionList()
      .find((transition) => +transition.action_id === +id);
  },

  getTransitionByName(name) {
    return get()
      .transitionList()
      .find((transition) => transition.description === name);
  },

  getFilteredTransitionByCurrentStateId(currentStateId) {
    return get()
      .transitionList()
      .filter((transition) => +transition.current_state_id === currentStateId);
  },
});
