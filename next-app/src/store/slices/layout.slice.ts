import { StateCreator } from "zustand";
import { ILayoutState } from "../interface/layout.interface";

export const LayoutSlice: StateCreator<ILayoutState> = (set, get) => ({
  isLoading: false,
  setIsLoading(isLoading) {
    set({ isLoading })
  },
})