import { I5M1ERequestListResponse, _5M1ERequest } from "@/types/request.type";

export interface I5M1ERequestListState {
  requestList: _5M1ERequest[]

  setRequest: (request: I5M1ERequestListResponse[]) => void
}