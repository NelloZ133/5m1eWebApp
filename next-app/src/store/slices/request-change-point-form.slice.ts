import { ItemDetailOther, KPI_LIST } from "@/constant";
import { StateCreator } from "zustand";
import { _5M1ESettingStore } from "../5m1e-setting.store";
import { IRequestChangePointFormState } from "../interface/request-change-point-form.interface";
import { UserStore } from "../user.store";

export const RequestChangePointFormSlice: StateCreator<IRequestChangePointFormState> = (set, get) => ({
  selectedCategory: null,
  selectedItemId: null,
  selectedLineId: null,
  selectedProcessId: null,
  selectedProductId: null,
  selectedItemDetailId: null,

  categoryList() {
    return _5M1ESettingStore.getState().changePointCategoryNameList()
  },
  kpiList() {
    return KPI_LIST
  },
  productList() {
    return _5M1ESettingStore.getState().productList()
  },
  machineNameList() {
    return _5M1ESettingStore.getState().machineNameList()
  },
  lineList() {
    return _5M1ESettingStore.getState().lineList()
  },
  availableLineList() {
    const { user } = UserStore.getState()
    const { userJoinRolePositionDict, productLineList } = _5M1ESettingStore.getState()
    const selectedProductId = get().selectedProductId
    if (!user?.user_uuid || !selectedProductId) {
      return []
    }

    const userJoinRolePosition = userJoinRolePositionDict[user.user_uuid]
    const availableLineIdList = productLineList.filter(productLine => +productLine.product_id === +selectedProductId).map(productLine => productLine.line_id)
    return _5M1ESettingStore.getState().lineList().filter(line => line.id && availableLineIdList.includes(line.id) && user.concern_line.includes(line.id))
  },
  availableCategoryItemList() {
    return _5M1ESettingStore.getState().listItemChangePointDict?.[get().selectedCategory ?? ''] ?? []
  },
  availableItemDetailList() {
    const matchDetails = _5M1ESettingStore.getState().itemDetailDict?.[get().selectedItemId ?? -1] ?? []

    return matchDetails.length ? [...matchDetails, ItemDetailOther] : []
  },
  availableProcessList() {
    return _5M1ESettingStore.getState().processList().filter(process => process.line_id === get().selectedLineId)
  },
  availableMachineList() {
    const selectedProcessId = get().selectedProcessId
    if (!selectedProcessId) {
      return []
    }
    const processMachineList = Object.values(_5M1ESettingStore.getState().processMachineDict)
    return processMachineList.filter(processMachine => +processMachine.process_id === +selectedProcessId).map(processMachine => processMachine.machine_no)
  },
  availablePartList() {
    return _5M1ESettingStore.getState().partList().filter(part => part.product_id === get().selectedProductId) 
  },

  setSelectedCategory(selectedCategory) {
    set({ selectedCategory })
  },
  setSelectedItemId(selectedItemId) {
    set({ selectedItemId })
  },
  setSelectedLineId(selectedLineId) {
    set({ selectedLineId })
  },
  setSelectedProcessId(selectedProcessId) {
    set({ selectedProcessId })
  }, 
  setSelectedProductId(selectedProductId) {
    set({ selectedProductId })
  },
  setSelectedItemDetailId(selectedItemDetailId) {
    set({ selectedItemDetailId })
  },

  reset() {
    set({
      selectedCategory: null,
      selectedItemId: null,
      selectedLineId: null,
      selectedProductId: null,
      selectedItemDetailId: null,
    })
  },
})