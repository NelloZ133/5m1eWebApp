import { RequestConfigStore } from "@/store/request-config.store";
import { IRequestConfigResponse } from "@/types/request-config.type";
import { fetchJson } from "@/util";

export async function fetchRequestConfig(): Promise<IRequestConfigResponse> {
  const { setRequestConfig } = RequestConfigStore.getState()
  
  const requestConfigResponse = await fetchJson<IRequestConfigResponse>(`${window.location.origin}/statics/requestFlowConfig.json`)
  setRequestConfig(requestConfigResponse)

  return requestConfigResponse
}