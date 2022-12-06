import { FilterRequestType } from "@/constant";
import { StateCreator } from "zustand";
import { _5M1ESettingStore } from "../5m1e-setting.store";
import { IRequestFilterState } from "../interface/request-filter.interface";

export const RequestFilterSlice: StateCreator<IRequestFilterState> = (set, get) => ({
  selectedRequestType: FilterRequestType[0],

  availableCategory() {
    const { problemCategoryNameList, changePointCategoryNameList } = _5M1ESettingStore.getState()

    const selectedRequestType = get().selectedRequestType
    if (selectedRequestType === FilterRequestType[0]) {
      return [...problemCategoryNameList(), ...changePointCategoryNameList()]
    }

    return selectedRequestType === FilterRequestType[1] ? problemCategoryNameList() : changePointCategoryNameList()
  },

  setSelectedRequestType(selectedRequestType) {
    set({ selectedRequestType })
  },

  reset() {
    set({
      selectedRequestType: FilterRequestType[0]
    })
  },
})
