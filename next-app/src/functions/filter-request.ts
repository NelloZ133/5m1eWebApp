import { FilterRequestType } from "@/constant";
import { RequestConfigStore, _5M1ESettingStore } from "@/store";
import { IRequestFilterForm } from "@/types/request-form.type";
import { _5M1ERequest } from "@/types/request.type";
const KeyNameToFunc: Record<keyof IRequestFilterForm, Function> = {
  requestType: isMatchRequestType,
  category: isMatchCategory,
  informer: isMatchInformer,
  kpi: isMatchKPI,
  line: isMatchLine,
  manager: isMatchManager,
  part: isMatchPart,
  topic: isMatchTopic
}

export function filterRequestByForm(requestList: _5M1ERequest[], form: IRequestFilterForm) {
  const executionList: Array<keyof IRequestFilterForm> = [
    'requestType',
    'category',
    'kpi',
    'topic',
    'part',
    'line',
    'informer',
    'manager'
  ]
  return requestList.filter(request => {
    return executionList.every(execution => {
      let isEmpty = true
      let value = undefined
      switch (typeof form[execution]) {
        case 'string': {
          value = form[execution]?.trim() ?? ''
          isEmpty = value === ''
          break
        }
        case 'object': {
          value = form[execution]
          isEmpty = (form[execution]?.length ?? 0) === 0
          break
        }
      }
      return !isEmpty ? KeyNameToFunc[execution](request, value) : true
    })
  })
}

export function isMatchRequestType(request: _5M1ERequest, requestType: string) {
  const { requestProcessDict } = _5M1ESettingStore.getState()
  if (requestType === FilterRequestType[0]) {
    return true
  }

  return requestProcessDict?.[request.request_process_id]?.request_process_tag_name === requestType
}

export function isMatchCategory(request: _5M1ERequest, category: string) {
  return request.request_data_value.category === category
}

export function isMatchKPI(request: _5M1ERequest, kpi: string[]) {
  return request.request_data_value.kpi?.some(v => kpi.includes(v))
}

export function isMatchTopic(request: _5M1ERequest, topic: string) {
  const { listItemProblemList, listItemChangePointList } = _5M1ESettingStore.getState()
  const item = [...listItemProblemList(), ...listItemChangePointList()].find(item => +request.request_data_value.itemId === +item.list_item_id)
  const itemName = item?.list_item_name ?? ''
  return itemName.toLowerCase().includes(topic.toLowerCase())
}

export function isMatchPart(request: _5M1ERequest, part: string) {
  const { partDict } = _5M1ESettingStore.getState()
  const partName = partDict?.[request.request_data_value.partId]?.part_name ?? ''
  return partName.toLowerCase().includes(part.toLowerCase())
}

export function isMatchLine(request: _5M1ERequest, line: string) {
  const { lineDict } = _5M1ESettingStore.getState()
  const lineName = lineDict?.[request.request_data_value.lineId]?.line_name ?? ''
  return lineName.toLowerCase().includes(line.toLowerCase())
}

export function isMatchInformer(request: _5M1ERequest, informer: string) {
  const { userJoinRolePositionDict } = _5M1ESettingStore.getState()
  const userFirstName = userJoinRolePositionDict?.[request.user_uuid]?.firstname ?? ''
  return userFirstName.toLowerCase().includes(informer.toLowerCase())
}

export function isMatchManager(request: _5M1ERequest, manager: string) {
  const { userJoinRolePositionDict } = _5M1ESettingStore.getState()
  const { action } = RequestConfigStore.getState()
  const userFirstName = userJoinRolePositionDict?.[request.actionList.find(act => action[act.action_id]?.name === 'Approve request')?.action_user_uuid ?? '']?.firstname ?? ''
  return userFirstName.toLowerCase().includes(manager.toLowerCase())
}
