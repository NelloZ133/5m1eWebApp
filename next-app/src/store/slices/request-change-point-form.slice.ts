import { ItemDetail, ListItem } from "./../../types/5m1e-setting.type";
import {
  ItemDetailOther,
  KPI_LIST,
  AvailableChangeCategory,
  AvailableChangeListItem,
} from "@/constant";
import { StateCreator } from "zustand";
import { _5M1ESettingStore } from "../5m1e-setting.store";
import { IRequestChangePointFormState } from "../interface/request-change-point-form.interface";
import { UserStore } from "../user.store";

export const RequestChangePointFormSlice: StateCreator<
  IRequestChangePointFormState
> = (set, get) => ({
  selectedCategory: null,
  selectedItemId: null,
  selectedLineId: null,
  selectedProcessId: null,
  selectedProductId: null,
  selectedItemDetailId: null,

  categoryList() {
    return AvailableChangeCategory;
  },
  kpiList() {
    return KPI_LIST;
  },
  lineList() {
    return _5M1ESettingStore.getState().lineList();
  },
  availableLineList() {
    const { user } = UserStore.getState();
    if (!user?.user_uuid) {
      return [];
    }
    return _5M1ESettingStore
      .getState()
      .lineList()
      .filter((line) => line.id && user.concern_line.includes(line.id));
  },
  availableCategoryItemList() {
    return AvailableChangeListItem.filter(
      (list_item) => list_item.category === get().selectedCategory
    );
  },
  availableItemDetailList() {
    const list: ItemDetail[] = _5M1ESettingStore
      .getState()
      .itemDetailList()
      .filter((item) => item.list_item_id === get().selectedItemId);
    list.push(ItemDetailOther);
    return list;
  },
  availableProcessList() {
    return _5M1ESettingStore
      .getState()
      .processList()
      .filter((process) => process.line_id === get().selectedLineId);
  },

  setSelectedCategory(selectedCategory) {
    set({ selectedCategory });
  },
  setSelectedItemId(selectedItemId) {
    set({ selectedItemId });
  },
  setSelectedLineId(selectedLineId) {
    set({ selectedLineId });
  },
  setSelectedProcessId(selectedProcessId) {
    set({ selectedProcessId });
  },
  setSelectedProductId(selectedProductId) {
    set({ selectedProductId });
  },
  setSelectedItemDetailId(selectedItemDetailId) {
    set({ selectedItemDetailId });
  },

  reset() {
    set({
      selectedCategory: null,
      selectedItemId: null,
      selectedLineId: null,
      selectedProductId: null,
      selectedItemDetailId: null,
    });
  },
});
