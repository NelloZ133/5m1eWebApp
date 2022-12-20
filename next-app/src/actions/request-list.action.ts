import axiosInstance from "@/lib/axios";
import { _5M1ERequestStore } from "@/store/5m1e-request.store";
import { I5M1ERequestListResponse } from "@/types/request.type";

export async function getAllRequest(): Promise<I5M1ERequestListResponse[]> {
  const { setRequest } = _5M1ERequestStore.getState();
  const { data } = await axiosInstance.get<I5M1ERequestListResponse[]>(
    `request/get/allrequests`
  );

  setRequest(data);

  return data;
}
