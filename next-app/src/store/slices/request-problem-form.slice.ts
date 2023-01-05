import { ItemDetail } from "./../../types/5m1e-setting.type";
import {
  ItemDetailOther,
  KPI_LIST,
  AvailableProblemCategory,
  AvailableProblemListItem,
} from "@/constant";
import { StateCreator } from "zustand";
import { _5M1ESettingStore } from "../5m1e-setting.store";
import { IRequestProblemFormState } from "../interface/request-problem-form.interface";
import { UserStore } from "../user.store";

export const RequestProblemFormSlice: StateCreator<IRequestProblemFormState> = (
  set,
  get
) => ({
  selectedCategory: null,
  selectedItem: null,
  selectedLineId: null,
  selectedProcessId: null,
  selectedProduct: null,
  selectedItemDetail: null,

  categoryList() {
    return AvailableProblemCategory;
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
    return AvailableProblemListItem.filter(
      (list_item) => list_item.category === get().selectedCategory
    );
  },
  availableItemDetailList() {
    const list: ItemDetail[] = _5M1ESettingStore
      .getState()
      .itemDetailList()
      .filter((item) => item.list_item_id === get().selectedItem?.list_item_id);
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
  setSelectedItem(selectedItem) {
    set({ selectedItem });
  },
  setSelectedProcessId(selectedProcessId) {
    set({ selectedProcessId });
  },
  setSelectedLineId(selectedLineId) {
    set({ selectedLineId });
  },
  setSelectedProduct(selectedProduct) {
    set({ selectedProduct });
  },
  setSelectedItemDetail(selectedItemDetail) {
    set({ selectedItemDetail });
  },

  reset() {
    set({
      selectedCategory: null,
      selectedItem: null,
      selectedLineId: null,
      selectedProcessId: null,
      selectedProduct: null,
      selectedItemDetail: null,
    });
  },
});
