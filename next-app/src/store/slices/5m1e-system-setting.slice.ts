import { MapKeyValueDictToType } from "@/util";
import { StateCreator } from "zustand";
import { I5M1ESystemSettingState } from "../interface/5m1e-system-setting.interface";

export const _5M1ESystemSettingSlice: StateCreator<I5M1ESystemSettingState> = (
  set,
  get
) => ({
  positionDict: {},
  userJoinRolePositionDict: {},

  positionList() {
    return MapKeyValueDictToType(get().positionDict);
  },
  userJoinRolePositionList() {
    return MapKeyValueDictToType(get().userJoinRolePositionDict);
  },

  setSystemSetting(systemSetting) {
    set({
      positionDict: systemSetting.positions,
      userJoinRolePositionDict: systemSetting.users_join_roles_positions,
    });
  },

  getPositionByName(name) {
    return get()
      .positionList()
      .find((position) => position.position_name === name);
  },
  getFilteredPositionByGroupName(groupName) {
    return get()
      .positionList()
      .filter((position) => position.position_group === groupName);
  },
  getUserJoinRolePositionByUserId(userId) {
    return get()
      .userJoinRolePositionList()
      .find((user) => user.user_id === userId);
  },
  getUserJoinRolePositionByUUID(uuid) {
    return get()
      .userJoinRolePositionList()
      .find((user) => user.id === uuid);
  },
  getUserJoinRolePositionByEmail(email) {
    return get()
      .userJoinRolePositionList()
      .find((user) => user.email === email);
  },
});
