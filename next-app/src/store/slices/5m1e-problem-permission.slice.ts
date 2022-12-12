import { PositionMapToPoint } from "@/constant";
import { _5M1ERequest } from "@/types/request.type";
import { StateCreator } from "zustand";
import { _5M1ESettingStore } from "../5m1e-setting.store";
import { I5M1EProblemPermissionState } from "../interface/5m1e-problem-permission.interface";
import { UserStore } from "../user.store";

export const _5M1EProblemPermissionSlice: StateCreator<
  I5M1EProblemPermissionState
> = (set, get) => ({
  canSubmit(request) {
    const { user } = UserStore.getState();
    if (!user?.user_uuid) {
      return false;
    }
    const { isPositionGroupDirect } = _5M1ESettingStore.getState();
    return (
      isPositionGroupDirect(user.user_uuid) &&
      request.user_uuid === user.user_uuid
    );
  },
  canApprove(request) {
    const { user } = UserStore.getState();
    if (!user?.user_uuid) {
      return false;
    }
    const {
      isPositionLL,
      isPositionTL,
      isPositionMGR,
      isPositionFM,
      isPositionFD,
      isPositionGroupDirect,
      userJoinRolePositionDict,
    } = _5M1ESettingStore.getState();
    const userJoinRolePosition = userJoinRolePositionDict[user.user_uuid];
    const submitUserUUID = request.actionList[0].user_uuid;
    const submitUserJoinRolePosition = userJoinRolePositionDict[submitUserUUID];
    const userPoint =
      PositionMapToPoint[userJoinRolePosition?.position_name] || 0;
    const submitUserPoint =
      PositionMapToPoint[submitUserJoinRolePosition?.position_name] || 0;
    return (
      request.user_uuid !== user.user_uuid &&
      isPositionGroupDirect(user.user_uuid) &&
      (isPositionLL(user.user_uuid) ||
        isPositionTL(user.user_uuid) ||
        isPositionMGR(user.user_uuid) ||
        isPositionFM(user.user_uuid) ||
        isPositionFD(user.user_uuid)) &&
      userPoint >= submitUserPoint
    );
  },
  canReject(request) {
    return get().canApprove(request);
  },
  canCancel(request) {
    const { user } = UserStore.getState();
    if (!user?.user_uuid) {
      return false;
    }
    const {
      isPositionLL,
      isPositionTL,
      isPositionMGR,
      isPositionFM,
      isPositionFD,
      isPositionGroupDirect,
      userJoinRolePositionDict,
    } = _5M1ESettingStore.getState();
    const userJoinRolePosition = userJoinRolePositionDict[user.user_uuid];
    const submitUserUUID = request.actionList[0].user_uuid;
    const submitUserJoinRolePosition = userJoinRolePositionDict[submitUserUUID];
    const userPoint =
      PositionMapToPoint[userJoinRolePosition?.position_name] || 0;
    const submitUserPoint =
      PositionMapToPoint[submitUserJoinRolePosition?.position_name] || 0;
    return (
      request.user_uuid === user.user_uuid ||
      (isPositionGroupDirect(user.user_uuid) &&
        (isPositionLL(user.user_uuid) ||
          isPositionTL(user.user_uuid) ||
          isPositionMGR(user.user_uuid) ||
          isPositionFM(user.user_uuid) ||
          isPositionFD(user.user_uuid)) &&
        userPoint >= submitUserPoint)
    );
  },
  canSelectSupporter() {
    const { user } = UserStore.getState();
    if (!user?.user_uuid) {
      return false;
    }
    const { isPositionGroupDirect, isPositionMGR, isPositionFM, isPositionFD } =
      _5M1ESettingStore.getState();
    return (
      isPositionGroupDirect(user.user_uuid) &&
      (isPositionMGR(user.user_uuid) ||
        isPositionFM(user.user_uuid) ||
        isPositionFD(user.user_uuid))
    );
  },
  canDoActionByGivenTransition(request, transition) {
    if (!transition.id) {
      return false;
    }

    const TransitionIdToValidateActionFunc: Record<
      number,
      (request: _5M1ERequest) => boolean
    > = {
      1: get().canSubmit,
      2: get().canCancel,
      3: get().canApprove,
      4: get().canReject,
      5: get().canSelectSupporter,
      6: get().canSelectSupporter,
      11: get().canSubmit,
      12: get().canCancel,
      13: get().canApprove,
      14: get().canReject,
      15: get().canSelectSupporter,
      16: get().canSelectSupporter,
    };
    return (
      TransitionIdToValidateActionFunc?.[+transition.id]?.(request) ?? false
    );
  },
});
