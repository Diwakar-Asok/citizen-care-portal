import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { FormState } from "../../types/form";
import { storage } from "../../utils/storage";

const FORM_KEY = "form_draft";
const savedState = storage.get<FormState>(FORM_KEY);

const initialState: FormState = savedState ?? {
  step1: {
    name: "",
    nationalId: "",
    dob: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    country: "",
    phone: "",
    email: "",
  },
  step2: {
    maritalStatus: "",
    dependents: "",
    employmentStatus: "",
    monthlyIncome: "",
    housingStatus: "",
  },
  step3: {
    financialSituation: "",
    employmentCircumstances: "",
    reasonForApplying: "",
  },
};

interface SaveStepPayload {
  step: 1 | 2 | 3;
  data: Partial<FormState["step1"] | FormState["step2"] | FormState["step3"]>;
}

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    saveStep: (state, action: PayloadAction<SaveStepPayload>) => {
      const { step, data } = action.payload;
      Object.assign(state[`step${step}`], data);
      storage.set(FORM_KEY, state); // persist after every save
    },
    resetForm: () => {
      storage.remove(FORM_KEY);
      return initialState;
    },
  },
});

export const { saveStep, resetForm } = formSlice.actions;
export { initialState };
export default formSlice.reducer;
