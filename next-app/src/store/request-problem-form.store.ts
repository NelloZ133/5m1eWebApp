import { create } from "zustand";
import { IRequestProblemFormState } from "./interface/request-problem-form.interface";
import { RequestProblemFormSlice } from "./slices/request-problem-form.slice";

export const RequestProblemFormStore = create<IRequestProblemFormState>(
  (...args) => ({
    ...RequestProblemFormSlice(...args),
  })
);
