import { DefaultListItem } from "./../../constant";
import {
  AvailableProblemCategory,
  AvailableChangeCategory,
  AvailableProblemListItem,
  AvailableChangeListItem,
  AvailableItemDetail,
} from "@/constant";
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
  listItemProblemDict: {},
  listItemChangePointDict: {},
  processDict: {},
  processMachineDict: {},
  productDict: {},

  problemCategoryNameList() {
    return AvailableProblemCategory;
  },
  changePointCategoryNameList() {
    return AvailableChangeCategory;
  },
  lineList() {
    return MapKeyValueDictToType(get().lineDict);
  },
  processList() {
    return MapKeyValueDictToType(get().processDict);
  },
  requestProcessList() {
    return MapKeyValueDictToType(get().requestProcessDict);
  },
  itemDetailList() {
    return AvailableItemDetail;
  },
  listItemProblemList() {
    return AvailableProblemListItem;
  },
  listItemChangePointList() {
    return AvailableChangeListItem;
  },

  setReportSetting(response) {
    set({
      requestProcessDict: response.request_processes,
      lineDict: response.lines,
      processDict: response.processes,
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
    const found = get()
      .listItemProblemList()
      .find((listItem) => listItem.list_item_id === listItemId);
    if (found !== undefined) {
      return found;
    } else {
      return DefaultListItem;
    }
  },

  getProblemListItemByName(listItemName) {
    const found = get()
      .listItemProblemList()
      .find((listItem) => listItem.list_item_name === listItemName);
    if (found !== undefined) {
      return found;
    } else {
      return DefaultListItem;
    }
  },

  getChangePointListItemById(listItemId) {
    const found = get()
      .listItemChangePointList()
      .find((listItem) => listItem.list_item_id === listItemId);
    if (found !== undefined) {
      return found;
    } else {
      return DefaultListItem;
    }
  },
  getChangePointListItemByName(listItemName) {
    const found = get()
      .listItemChangePointList()
      .find((listItem) => listItem.list_item_name === listItemName);
    if (found !== undefined) {
      return found;
    } else {
      return DefaultListItem;
    }
  },
});
