import { ItemDetail, Line, ListItem, Process } from "@/types/5m1e-setting.type";

export interface IRequestProblemFormState {
  selectedCategory: string | null;
  selectedItem: ListItem | null;
  selectedLineId: number | null;
  selectedProcessId: number | null;
  selectedProduct: string | null;
  selectedItemDetail: string | null;

  categoryList: () => string[];
  kpiList: () => string[];
  lineList: () => Line[];
  availableLineList: () => Line[];
  availableCategoryItemList: () => ListItem[];
  availableItemDetailList: () => ItemDetail[];
  availableProcessList: () => Process[];

  setSelectedCategory: (value: string | null) => void;
  setSelectedItem: (value: ListItem | null) => void;
  setSelectedLineId: (value: number | null) => void;
  setSelectedProcessId: (value: number | null) => void;
  setSelectedProduct: (value: string | null) => void;
  setSelectedItemDetail: (value: string | null) => void;

  reset: () => void;
}
