import {
  ItemDetail,
  Line,
  ListItem,
  Process,
  RequestProcess,
  I5M1EReportSettingResponse,
} from "@/types/5m1e-setting.type";

export interface I5M1EReportSettingState {
  requestProcessDict: Record<number, RequestProcess>;
  lineDict: Record<number, Line>;
  processDict: Record<number, Process>;

  problemCategoryNameList: () => string[];
  changePointCategoryNameList: () => string[];
  lineList: () => Line[];
  processList: () => Process[];
  requestProcessList: () => RequestProcess[];
  itemDetailList: () => ItemDetail[];
  listItemProblemList: () => ListItem[];
  listItemChangePointList: () => ListItem[];

  setReportSetting: (response: I5M1EReportSettingResponse) => void;

  getRequestProcessByName: (name: string) => RequestProcess | undefined;
  getItemDetailById: (detailId: number) => ItemDetail | undefined;
  getProblemListItemById: (listItemId: number) => ListItem | undefined;
  getChangePointListItemById: (listItemId: number) => ListItem | undefined;
}
