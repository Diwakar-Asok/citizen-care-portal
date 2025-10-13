// utils/progress.ts
import type { FormState } from "../types/form";

export const calculateProgress = (form: FormState): number => {
const step1Fields = [
  "name", "nationalId", "dob", "gender", "address",
  "city", "state", "country", "phone", "email",
];
const step2Fields = [
  "maritalStatus", "dependents", "employmentStatus",
  "monthlyIncome", "housingStatus",
];
const step3Fields = [
  "financialSituation", "employmentCircumstances", "reasonForApplying",
];

function filledPercent(stepData: Record<string, any>, fieldList: string[]) {
  const filled = fieldList.filter(
    (key) => stepData[key] && String(stepData[key]).trim().length > 0
  ).length;
  return Math.round((filled / fieldList.length) * 100);
}

const step1Percent = filledPercent(form.step1, step1Fields);
const step2Percent = filledPercent(form.step2, step2Fields);
const step3Percent = filledPercent(form.step3, step3Fields);

// if global progress bar
const overallPercent = Math.round((step1Percent + step2Percent + step3Percent) / 3);
  return overallPercent > 100 ? 100 : overallPercent;
};
