import { FilterRequestType, AvailableCategory } from "@/constant";
import { StateCreator } from "zustand";
import { _5M1ESettingStore } from "../5m1e-setting.store";
import { IRequestFilterState } from "../interface/request-filter.interface";

export const RequestFilterSlice: StateCreator<IRequestFilterState> = (
  set,
  get
) => ({
  selectedRequestType: FilterRequestType[0],

  availableCategory() {
    return AvailableCategory;
  },

  setSelectedRequestType(selectedRequestType) {
    set({ selectedRequestType });
  },

  reset() {
    set({
      selectedRequestType: FilterRequestType[0],
    });
  },
});
