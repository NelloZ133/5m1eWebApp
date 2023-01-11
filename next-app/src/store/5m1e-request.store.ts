import { create } from "zustand";
import { I5M1ERequestListState } from "./interface/5m1e-request-list.interface";
import { _5M1ERequestListSlice } from "./slices/5m1e-request-list.slice";

export const _5M1ERequestStore = create<I5M1ERequestListState>((...args) => ({
  ..._5M1ERequestListSlice(...args),
}));
