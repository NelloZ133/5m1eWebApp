import { ItemDetail, ListItem } from "@/types/5m1e-setting.type";
import { MapKeyValueDictToType } from "@/util";
import { StateCreator } from "zustand";
import { I5M1EReportSettingState } from "../interface/5m1e-report-setting.interface";

export const _5M1EReportSettingSlice: StateCreator<I5M1EReportSettingState> = (
  set,
  get
) => ({
  requestProcessDict: {},
  itemDetailDict: {},
  lineDict: {},
  linePartDict: {},
  listItemProblemDict: {},
  listItemChangePointDict: {},
  machineDict: {},
  partDict: {},
  processDict: {},
  processMachineDict: {},
  productDict: {},
  // productLineList: [],

  problemCategoryNameList() {
    return Object.keys(get().listItemProblemDict);
  },
  changePointCategoryNameList() {
    return Object.keys(get().listItemChangePointDict);
  },
  productList() {
    return MapKeyValueDictToType(get().productDict);
  },
  lineList() {
    return MapKeyValueDictToType(get().lineDict);
  },
  processList() {
    return MapKeyValueDictToType(get().processDict);
  },
  machineNameList() {
    return Object.keys(get().machineDict);
  },
  partList() {
    return MapKeyValueDictToType(get().partDict);
  },
  requestProcessList() {
    return MapKeyValueDictToType(get().requestProcessDict);
  },
  itemDetailList() {
    return Object.values(get().itemDetailDict).flat();
  },
  listItemProblemList() {
    return Object.values(get().listItemProblemDict).flat();
  },
  listItemChangePointList() {
    return Object.values(get().listItemChangePointDict).flat();
  },

  setReportSetting(response) {
    set({
      requestProcessDict: response.request_processes,
      itemDetailDict: Object.keys(response.item_details)
        .map((v) => +v)
        .reduce<Record<number, ItemDetail[]>>((prev, cur) => {
          prev[cur] = response.item_details[cur].data;
          return prev;
        }, {}),
      lineDict: response.lines,
      linePartDict: response.lines_parts,
      listItemProblemDict: Object.keys(response.list_items_problem).reduce<
        Record<string, ListItem[]>
      >((prev, cur) => {
        prev[cur] = response.list_items_problem[cur].data;
        return prev;
      }, {}),
      listItemChangePointDict: Object.keys(
        response.list_items_changepoint
      ).reduce<Record<string, ListItem[]>>((prev, cur) => {
        prev[cur] = response.list_items_changepoint[cur].data;
        return prev;
      }, {}),
      machineDict: response.machines,
      partDict: response.parts,
      processDict: response.processes,
      processMachineDict: response.processes_machines,
      productDict: response.products,
      // productLineList: Object.values(response.products_lines)
    });
  },

  getRequestProcessByName(name) {
    return get()
      .requestProcessList()
      .find((reqProcess) => reqProcess.request_process_name === name);
  },

  getItemDetailById(itemDetailId) {
    return get()
      .itemDetailList()
      .find((itemDetail) => itemDetail.item_detail_id === itemDetailId);
  },

  getProblemListItemById(listItemId) {
    return get()
      .listItemProblemList()
      .find((listItem) => listItem.list_item_id === listItemId);
  },

  getChangePointListItemById(listItemId) {
    return get()
      .listItemChangePointList()
      .find((listItem) => listItem.list_item_id === listItemId);
  },
});
