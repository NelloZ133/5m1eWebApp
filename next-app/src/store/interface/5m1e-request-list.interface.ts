import {
  I5M1ERequestListResponse,
  _5M1ERequest,
} from "./../../types/request.type";

export interface I5M1ERequestListState {
  requestList: _5M1ERequest[];
  // requestChangeList: _5M1EChangeRequest[];

  setRequest: (request: I5M1ERequestListResponse[]) => void;
  // setRequestChange: (requestChange: I5M1EChangeRequestListResponse[]) => void;
}
