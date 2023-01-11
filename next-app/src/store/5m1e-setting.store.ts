import {
  fetch5M1EReportSetting,
  fetch5M1ESystemSetting,
  fetchRequestConfig,
} from "@/actions";
import { _5M1ERequestSelect } from "@/types/request.type";
import { create } from "zustand";
import { _5M1ERequestStore } from "./5m1e-request.store";
import { I5M1EProblemPermissionState } from "./interface/5m1e-problem-permission.interface";
import { I5M1EReportSettingState } from "./interface/5m1e-report-setting.interface";
import { I5M1ESettingState } from "./interface/5m1e-setting.interface";
import { I5M1ESystemSettingState } from "./interface/5m1e-system-setting.interface";
import { _5M1EProblemPermissionSlice } from "./slices/5m1e-problem-permission.slice";
import { _5M1EReportSettingSlice } from "./slices/5m1e-report-setting.slice";
import { _5M1ESystemSettingSlice } from "./slices/5m1e-system-setting.slice";
import { UserStore } from "./user.store";

export const _5M1ESettingStore = create<
  I5M1ESettingState &
    I5M1EProblemPermissionState &
    I5M1EReportSettingState &
    I5M1ESystemSettingState
>((...args) => ({
  ..._5M1EReportSettingSlice(...args),
  ..._5M1ESystemSettingSlice(...args),
  ..._5M1EProblemPermissionSlice(...args),

  isPositionGroupDirect(uuid) {
    const [set, get] = args;
    const userJoinRolePosition = get().userJoinRolePositionDict[uuid];
    return userJoinRolePosition?.position_group === "Direct";
  },
  isPositionGroupInDirect(uuid) {
    const [set, get] = args;
    const userJoinRolePosition = get().userJoinRolePositionDict[uuid];
    return userJoinRolePosition?.position_group === "Indirect";
  },
  isPositionLL(uuid) {
    const [set, get] = args;
    const userJoinRolePosition = get().userJoinRolePositionDict[uuid];
    return userJoinRolePosition?.position_name === "LL";
  },
  isPositionTL(uuid) {
    const [set, get] = args;
    const userJoinRolePosition = get().userJoinRolePositionDict[uuid];
    return userJoinRolePosition?.position_name === "TL";
  },
  isPositionMGR(uuid) {
    const [set, get] = args;
    const userJoinRolePosition = get().userJoinRolePositionDict[uuid];
    return userJoinRolePosition?.position_name === "MGR";
  },
  isPositionOF(uuid) {
    const [set, get] = args;
    const userJoinRolePosition = get().userJoinRolePositionDict[uuid];
    return userJoinRolePosition?.position_name === "OF";
  },
  isPositionSO(uuid) {
    const [set, get] = args;
    const userJoinRolePosition = get().userJoinRolePositionDict[uuid];
    return userJoinRolePosition?.position_name === "SO";
  },
  isPositionFM(uuid) {
    const [set, get] = args;
    const userJoinRolePosition = get().userJoinRolePositionDict[uuid];
    return userJoinRolePosition?.position_name === "FM";
  },
  isPositionFD(uuid) {
    const [set, get] = args;
    const userJoinRolePosition = get().userJoinRolePositionDict[uuid];
    return userJoinRolePosition?.position_name === "FD";
  },

  availableSupporterList() {
    const { user } = UserStore.getState();
    if (!user?.user_uuid) {
      return [];
    }

    const [set, get] = args;
    return get()
      .userJoinRolePositionList()
      .filter((userJoinRolePosition) => {
        return (
          !!userJoinRolePosition.id &&
          userJoinRolePosition.id !== user.user_uuid &&
          get().isPositionGroupInDirect(userJoinRolePosition.id)
        );
      });
  },
  availableConfirmationList() {
    const [set, get] = args;
    return get().availableSupporterList();
  },
  availableEmailForSubmitList() {
    const { user } = UserStore.getState();
    if (!user?.user_uuid) {
      return [];
    }

    const [set, get] = args;
    return get()
      .userJoinRolePositionList()
      .filter((userJoinRolePosition) => {
        return (
          !!userJoinRolePosition.id &&
          userJoinRolePosition.id != user.user_uuid &&
          get().isPositionGroupDirect(userJoinRolePosition.id) &&
          (get().isPositionLL(userJoinRolePosition.id) ||
            get().isPositionTL(userJoinRolePosition.id) ||
            get().isPositionMGR(userJoinRolePosition.id))
        );
      });
  },
  canCreateProblemRequest() {
    const [set, get] = args;
    const { user } = UserStore.getState();
    return !!user?.user_uuid && get().isPositionGroupDirect(user?.user_uuid);
  },
  canCreateChangePointRequest() {
    const [set, get] = args;
    return get().canCreateProblemRequest();
  },

  

  fetchSetting() {
    fetch5M1EReportSetting();
    fetch5M1ESystemSetting();
    fetchRequestConfig();
  },
}));
