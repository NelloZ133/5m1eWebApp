import {
  I5M1ERequestListResponse,
  _5M1ERequest,
  _5M1ERequestAction,
} from "@/types/request.type";
import { StateCreator } from "zustand";
import { I5M1ERequestListState } from "../interface/5m1e-request-list.interface";

export const _5M1ERequestListSlice: StateCreator<I5M1ERequestListState> = (
  set,
  get
) => ({
  requestList: [],

  setRequest(requestList) {
    const requestMapByRequestId: Record<string, I5M1ERequestListResponse[]> =
      {};
    requestList.forEach((request) => {
      if (!requestMapByRequestId[request.request_id]) {
        requestMapByRequestId[request.request_id] = [];
      }
      requestMapByRequestId[request.request_id].push(request);
    });
    const computedActReqList = Object.values(
      requestMapByRequestId
    ).map<_5M1ERequest>((reqList) => {
      reqList.sort((a, b) =>
        a.action_created_at.localeCompare(b.action_created_at)
      );

      return {
        ...reqList[0],
        actionList: reqList.map<_5M1ERequestAction>((action) => ({
          ...action,
        })),
      };
    });

    set({
      requestList: computedActReqList,
    });
    // console.log(computedActReqList);
  },
});
