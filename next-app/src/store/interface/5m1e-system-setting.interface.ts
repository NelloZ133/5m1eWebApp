import {
  Position,
  UserJoinRolePosition,
  I5M1ESystemSettingResponse,
} from "@/types/5m1e-setting.type";

export interface I5M1ESystemSettingState {
  positionDict: Record<string, Position>;
  userJoinRolePositionDict: Record<string, UserJoinRolePosition>;

  positionList: () => Position[];
  userJoinRolePositionList: () => UserJoinRolePosition[];

  setSystemSetting: (systemSetting: I5M1ESystemSettingResponse) => void;

  getPositionByName: (name: string) => Position | undefined;
  getFilteredPositionByGroupName: (groupName: string) => Position[];
  getUserJoinRolePositionByUserId: (
    userId: string
  ) => UserJoinRolePosition | undefined;
  getUserJoinRolePositionByUUID: (
    uuid: string
  ) => UserJoinRolePosition | undefined;
  getUserJoinRolePositionByEmail: (
    email: string
  ) => UserJoinRolePosition | undefined;
}
