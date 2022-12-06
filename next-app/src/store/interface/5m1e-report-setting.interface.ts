import { ItemDetail, Line, LinePart, ListItem, Machine, Part, Process, ProcessMachine, Product, RequestProcess, I5M1EReportSettingResponse, ProductLine } from "@/types/5m1e-setting.type";

export interface I5M1EReportSettingState {
  requestProcessDict: Record<number, RequestProcess>
  itemDetailDict: Record<number, ItemDetail[]>
  lineDict: Record<number, Line>
  linePartDict: Record<number, LinePart>
  listItemProblemDict: Record<string, ListItem[]>
  listItemChangePointDict: Record<string, ListItem[]>
  machineDict: Record<string, Machine>
  partDict: Record<string, Part>
  processDict: Record<number, Process>
  processMachineDict: Record<number, ProcessMachine>
  productDict: Record<number, Product>
  productLineList: ProductLine[]

  problemCategoryNameList: () => string[]
  changePointCategoryNameList: () => string[]
  productList: () => Product[]
  lineList: () => Line[]
  processList: () => Process[]
  machineNameList: () => string[]
  partList: () => Part[]
  requestProcessList: () => RequestProcess[]
  itemDetailList: () => ItemDetail[]
  listItemProblemList: () => ListItem[]
  listItemChangePointList: () => ListItem[]

  setReportSetting: (response: I5M1EReportSettingResponse) => void

  getRequestProcessByName: (name: string) => RequestProcess | undefined
  getItemDetailById: (detailId: number) => ItemDetail | undefined
  getProblemListItemById: (listItemId: number) => ListItem | undefined
  getChangePointListItemById: (listItemId: number) => ListItem | undefined
  
}