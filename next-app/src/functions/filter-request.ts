import { is5M1EChangeRequest } from "@/functions";
import { _5M1EChangeRequest } from "./../types/request.type";
import { FilterRequestType } from "@/constant";
import { _5M1ESettingStore } from "@/store";
import { IRequestFilterForm } from "@/types/request-form.type";
import { _5M1ERequest } from "@/types/request.type";

const KeyNameToFunc: Record<keyof IRequestFilterForm, Function> = {
  requestType: isMatchRequestType,
  category: isMatchCategory,
  kpi: isMatchKPI,
  product: isMatchProduct,
  part: isMatchPart,
  line: isMatchLine,
  process: isMatchProcess,
  machine: isMatchMachine,
  informer: isMatchInformer,
};

export function filterRequestByForm(
  requestList: _5M1ERequest[] | _5M1EChangeRequest[],
  form: IRequestFilterForm
) {
  const executionList: Array<keyof IRequestFilterForm> = [
    "requestType",
    "category",
    "kpi",
    "product",
    "part",
    "line",
    "process",
    "machine",
    "informer",
  ];
  return requestList.filter((request) => {
    return executionList.every((execution) => {
      let isEmpty = true;
      let value = undefined;
      switch (typeof form[execution]) {
        case "string": {
          value = form[execution]?.trim() ?? "";
          isEmpty = value === "";
          break;
        }
        case "object": {
          value = form[execution];
          isEmpty = (form[execution]?.length ?? 0) === 0;
          break;
        }
      }
      return !isEmpty ? KeyNameToFunc[execution](request, value) : true;
    });
  });
}

export function isMatchRequestType(
  request: _5M1ERequest | _5M1EChangeRequest,
  requestType: string
) {
  const { requestProcessDict } = _5M1ESettingStore.getState();
  if (requestType === FilterRequestType[0]) {
    return true;
  }

  return (
    requestProcessDict?.[request.request_process_id]
      ?.request_process_tag_name === requestType
  );
}

export function isMatchCategory(
  request: _5M1ERequest | _5M1EChangeRequest,
  category: string
) {
  return request.request_data_value.category === category;
}

export function isMatchKPI(
  request: _5M1ERequest | _5M1EChangeRequest,
  kpi: string[]
) {
  if (is5M1EChangeRequest(request)) {
    return request.request_data_value.kpi?.some((v) => kpi.includes(v));
  }
  return false;
}

export function isMatchProduct(
  request: _5M1ERequest | _5M1EChangeRequest,
  product: string
) {
  const productName = request?.request_data_value.product ?? "";
  return productName.toLowerCase().includes(product.toLowerCase());
}

export function isMatchPart(
  request: _5M1ERequest | _5M1EChangeRequest,
  part: string
) {
  const partName = request?.request_data_value.partNo ?? "";
  return partName.toLowerCase().includes(part.toLowerCase());
}

export function isMatchLine(
  request: _5M1ERequest | _5M1EChangeRequest,
  line: string
) {
  const { lineDict } = _5M1ESettingStore.getState();
  const lineName =
    lineDict?.[request.request_data_value.lineId]?.line_name ?? "";
  return lineName.toLowerCase().includes(line.toLowerCase());
}

export function isMatchProcess(
  request: _5M1ERequest | _5M1EChangeRequest,
  process: string
) {
  const { processDict } = _5M1ESettingStore.getState();
  const processName =
    processDict?.[request.request_data_value.processId].process_name ?? "";
  return processName.toLowerCase().includes(process.toLowerCase());
}

export function isMatchMachine(
  request: _5M1ERequest | _5M1EChangeRequest,
  machine: string
) {
  const machineName = request?.request_data_value.machine ?? "";
  return machineName.toLowerCase().includes(machine.toLowerCase());
}

export function isMatchInformer(
  request: _5M1ERequest | _5M1EChangeRequest,
  informer: string
) {
  const { userJoinRolePositionDict } = _5M1ESettingStore.getState();
  const userFirstName =
    userJoinRolePositionDict?.[request.user_uuid]?.firstname ?? "";
  return userFirstName.toLowerCase().includes(informer.toLowerCase());
}

// export function isMatchTopic(request: _5M1ERequest, topic: string) {
//   const { listItemProblemList, listItemChangePointList } =
//     _5M1ESettingStore.getState();
//   const item = [...listItemProblemList(), ...listItemChangePointList()].find(
//     (item) => request.request_data_value.item === item.list_item_name
//   );
//   const itemName = item?.list_item_name ?? "";
//   return itemName.toLowerCase().includes(topic.toLowerCase());
// }
// export function isMatchManager(request: _5M1ERequest, manager: string) {
//   const { userJoinRolePositionDict } = _5M1ESettingStore.getState();
//   const { action } = RequestConfigStore.getState();
//   const userFirstName =
//     userJoinRolePositionDict?.[
//       request.actionList.find(
//         (act) => action[act.action_id]?.name === "Approve request"
//       )?.action_user_uuid ?? ""
//     ]?.firstname ?? "";
//   return userFirstName.toLowerCase().includes(manager.toLowerCase());
// }
