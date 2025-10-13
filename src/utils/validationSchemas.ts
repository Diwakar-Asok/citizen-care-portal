import * as yup from "yup";
import i18n from "i18next";
import type { Step1Data, Step2Data, Step3Data } from "../types/form";

// Step 1 Schema
export const step1Schema = (): yup.ObjectSchema<Step1Data> => yup.object({
  name: yup.string().required(i18n.t("errors.required", { field: i18n.t("form.name") })),
  nationalId: yup.string().required(i18n.t("errors.required", { field: i18n.t("form.nationalId") })),
  dob: yup.string().required(i18n.t("errors.required", { field: i18n.t("form.dob") })),
  gender: yup.string().required(i18n.t("errors.required", { field: i18n.t("form.gender") })),
  address: yup.string().required(i18n.t("errors.required", { field: i18n.t("form.address") })),
  city: yup.string().required(i18n.t("errors.required", { field: i18n.t("form.city") })),
  state: yup.string().required(i18n.t("errors.required", { field: i18n.t("form.state") })),
  country: yup.string().required(i18n.t("errors.required", { field: i18n.t("form.country") })),
  phone: yup.string().required(i18n.t("errors.required", { field: i18n.t("form.phone") })),
  email: yup.string().required(i18n.t("errors.required", { field: i18n.t("form.email") })),
});

// Step 2 Schema
export const step2Schema = (): yup.ObjectSchema<Step2Data> => yup.object({
  maritalStatus: yup.string().required(i18n.t("errors.required", { field: i18n.t("form.maritalStatus") })),
  dependents: yup.string().typeError(i18n.t("errors.invalidNumber", { field: i18n.t("form.dependents") }))
  .required(i18n.t("errors.required", { field: i18n.t("form.dependents") })),
  employmentStatus: yup.string().required(i18n.t("errors.required", { field: i18n.t("form.employmentStatus") })),
  monthlyIncome: yup.string().required(i18n.t("errors.required", { field: i18n.t("form.monthlyIncome") })),
  housingStatus: yup.string().required(i18n.t("errors.required", { field: i18n.t("form.housingStatus") })),
});

// Step 3 Schema
export const step3Schema = (): yup.ObjectSchema<Step3Data> => yup.object({
  financialSituation: yup.string().required(i18n.t("errors.required", { field: i18n.t("form.financialSituation") })),
  employmentCircumstances: yup.string().required(i18n.t("errors.required", { field: i18n.t("form.employmentCircumstances") })),
  reasonForApplying: yup.string().required(i18n.t("errors.required", { field: i18n.t("form.reasonForApplying") })),
});
