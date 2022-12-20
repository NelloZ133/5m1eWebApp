import { ItemDetail, Line, ListItem, Process } from "@/types/5m1e-setting.type";

export interface IRequestProblemFormState {
  selectedCategory: string | null;
  selectedItemId: number | null;
  selectedLineId: number | null;
  selectedProcessId: number | null;
  selectedProductId: string | null;
  selectedItemDetailId: number | null;

  categoryList: () => string[];
  kpiList: () => string[];
  lineList: () => Line[];
  availableLineList: () => Line[];
  availableCategoryItemList: () => ListItem[];
  availableItemDetailList: () => ItemDetail[];
  availableProcessList: () => Process[];

  setSelectedCategory: (value: string | null) => void;
  setSelectedItemId: (value: number | null) => void;
  setSelectedLineId: (value: number | null) => void;
  setSelectedProcessId: (value: number | null) => void;
  setSelectedProductId: (value: string | null) => void;
  setSelectedItemDetailId: (value: number | null) => void;

  reset: () => void;
}
