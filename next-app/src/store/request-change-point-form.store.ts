import create from "zustand";
import { IRequestChangePointFormState } from "./interface/request-change-point-form.interface";
import { RequestChangePointFormSlice } from "./slices/request-change-point-form.slice";

export const RequestChangePointFormStore = create<IRequestChangePointFormState>(
  (...args) => ({
    ...RequestChangePointFormSlice(...args),
  })
);
