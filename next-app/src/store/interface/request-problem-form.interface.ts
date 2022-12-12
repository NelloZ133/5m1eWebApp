import { ItemDetail, Line, ListItem, Part, Process, Product } from "@/types/5m1e-setting.type"

export interface IRequestProblemFormState {
  selectedCategory: string | null
  selectedItemId: number | null
  selectedLineId: number | null
  selectedProcessId: number | null
  selectedProductId: number | null
  selectedItemDetailId: number | null

  categoryList: () => string[]
  kpiList: () => string[]
  productList: () => Product[]
  machineNameList: () => string[]
  lineList: () => Line[]
  availableLineList: () => Line[]
  availableCategoryItemList: () => ListItem[]
  availableItemDetailList: () => ItemDetail[]
  availableProcessList: () => Process[]
  availableMachineList: () => string[]
  // availablePartList: () => Part[]

  setSelectedCategory: (value: string | null) => void
  setSelectedItemId: (value: number | null) => void
  setSelectedLineId: (value: number | null) => void
  setSelectedProcessId: (value: number | null) => void
  setSelectedProductId: (value: number | null) => void
  setSelectedItemDetailId: (value: number | null) => void

  reset: () => void
}