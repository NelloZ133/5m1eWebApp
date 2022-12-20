import { _5M1EChangeRequest, _5M1ERequest } from "@/types/request.type";


export function is5M1ERequest(object: any): object is _5M1ERequest {
  return object.request_process_id == 1;
}

export function is5M1EChangeRequest(object: any): object is _5M1EChangeRequest {
  return object.request_process_id == 2;
}