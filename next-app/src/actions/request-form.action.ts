import {
  RequestChangePointName,
  RequestProblemName,
  SubmitChangePointActionName,
  SubmitProblemActionName,
} from "@/constant";
import axiosInstance from "@/lib/axios";
import { UserStore, _5M1ESettingStore } from "@/store";
import { RequestConfigStore } from "@/store/request-config.store";
import {
  IRequestForm,
  ISubmitRequestFormParam,
  IUpdateRequestFormParam,
} from "@/types/request-form.type";
import { _5M1ERequest } from "@/types/request.type";

async function draftRequestForm(
  form: IRequestForm,
  problemRequestId: string | null,
  startActionName: string,
  requestProcessName: string
): Promise<any> {
  const { user } = UserStore.getState();
  const { getRequestProcessByName } = _5M1ESettingStore.getState();
  const { getActionByName, getTransitionByActionId } =
    RequestConfigStore.getState();

  const requestProcess = getRequestProcessByName(requestProcessName);
  const action = getActionByName(startActionName);
  const transition = getTransitionByActionId(action?.id ?? 0);

  const body: ISubmitRequestFormParam = {
    request_process_name: requestProcess?.request_process_short_name ?? "",
    request_process_id: requestProcess?.id ?? 0,
    action_user_uuid: user?.user_uuid ?? "",
    line_id: form.line,
    user_uuid: user?.user_uuid ?? "",
    email_list: [],
    transition_id: transition?.id ?? 0,
    action_id: action?.id ?? 0,
    current_state_id: +(transition?.current_state_id ?? 0),
    data_value: {
      problem_request_id: problemRequestId,
      category: form.category,
      itemId: form.item.list_item_id,
      detailId: form.detail.item_detail_id,
      detailOther: form.detail_other ?? "",
      kpi: form.kpi,
      productId: form.product,
      lineId: form.line,
      processId: form.process,
      machine: form.machine,
      partId: form.part,
      attachmentList: form.attachmentUrlList ?? [],
      note: form.note,
    },
    action_note: "",
  };

  const { data } = await axiosInstance.post<any>(`request/submit`, body);
  return data;
}

export async function updateRequestForm(
  transitionId: string,
  form: _5M1ERequest,
  emailList: string[],
  actionNote: string,
  supporterList: string[],
  confirmationList: string[]
): Promise<any> {
  const { user } = UserStore.getState();
  const { requestProcessDict } = _5M1ESettingStore.getState();
  const { transition } = RequestConfigStore.getState();
  const matchTransition = transition[transitionId];
  const body: IUpdateRequestFormParam = {
    request_id: form.request_id,
    request_process_name:
      requestProcessDict[form.request_process_id].request_process_short_name,
    request_process_id: form.request_process_id,
    action_user_uuid: user?.user_uuid ?? "",
    line_id: form.request_data_value.lineId,
    user_uuid: form.user_uuid,
    email_list:
      emailList.length === 0
        ? supporterList.length === 0
          ? confirmationList
          : supporterList
        : emailList,
    transition_id: +transitionId,
    action_id: +matchTransition.action_id,
    current_state_id: +(matchTransition?.next_state_id ?? 0),
    data_value: {
      ...form.request_data_value,
      supporterList,
      confirmationList,
    },
    action_note: actionNote,
  };
  const { data } = await axiosInstance.post<any>(`request/update`, body);
  return data;
}

export async function updateRequestFormValue(
  request: _5M1ERequest,
  form: IRequestForm
): Promise<any> {
  const { requestProcessDict } = _5M1ESettingStore.getState();

  const body: IUpdateRequestFormParam = {
    request_id: request.request_id,
    request_process_name:
      requestProcessDict[request.request_process_id].request_process_short_name,
    request_process_id: request.request_process_id,
    action_user_uuid: request.action_user_uuid,
    line_id: form.line,
    user_uuid: request.user_uuid,
    email_list: eval(request.email_list),
    transition_id: request.transition_id,
    action_id: request.action_id,
    current_state_id: request.current_state_id,
    data_value: {
      problem_request_id: request.request_data_value.problem_request_id,
      category: form.category,
      itemId: form.item.list_item_id,
      detailId: form.detail.item_detail_id,
      detailOther: form.detail_other ?? "",
      kpi: form.kpi,
      productId: form.product,
      lineId: form.line,
      processId: form.process,
      machine: form.machine,
      partId: form.part,
      attachmentList: form.attachmentUrlList ?? [],
      note: form.note,
    },
    action_note: "",
  };
  const { data } = await axiosInstance.post<any>(`request/save`, body);
  return data;
}

export async function draftRequestProblemForm(
  form: IRequestForm
): Promise<any> {
  return draftRequestForm(
    form,
    null,
    SubmitProblemActionName,
    RequestProblemName
  );
}

export async function draftRequestChangePointForm(
  form: IRequestForm,
  problemRequestId: string | null
): Promise<any> {
  return draftRequestForm(
    form,
    problemRequestId,
    SubmitChangePointActionName,
    RequestChangePointName
  );
}
