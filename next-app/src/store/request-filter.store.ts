import create from "zustand";
import { IRequestFilterState } from "./interface/request-filter.interface";
import { RequestFilterSlice } from "./slices/request-filter.slice";

export const RequestFilterStore = create<IRequestFilterState>((...args) => ({
  ...RequestFilterSlice(...args),
}));
