import { useMemo } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ApplicationForm from "./pages/ApplicationForm";
import NotFound from "./pages/NotFound";
import { step1Schema, step2Schema, step3Schema } from "./utils/validationSchemas";
import type { Step1Data, Step2Data, Step3Data } from "./types/form";

type StepKey = "step1" | "step2" | "step3";
type FormValues = Step1Data & Step2Data & Step3Data;

export default function App() {
  const { pathname } = useLocation();

  // Decide current step from URL
  const step: StepKey = useMemo(() => {
    if (pathname.includes("step3")) return "step3";
    if (pathname.includes("step2")) return "step2";
    return "step1";
  }, [pathname]);

  // Map steps to schemas (any object schema to avoid TS union headaches)
  const schemaMap: Record<StepKey, yup.AnyObjectSchema> = {
    step1: step1Schema(),
    step2: step2Schema(),
    step3: step3Schema(),
  };

  const methods = useForm<FormValues>({
    resolver: yupResolver(schemaMap[step]),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      // step1
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
      // step2
      maritalStatus: "",
      dependents: "",
      employmentStatus: "",
      monthlyIncome: "",
      housingStatus: "",
      // step3
      financialSituation: "",
      employmentCircumstances: "",
      reasonForApplying: "",
    },
  });

  return (
    <FormProvider {...methods}>
      <Routes>
        <Route path="/" element={<Navigate to="/apply/step1" replace />} />
        <Route path="/apply/*" element={<ApplicationForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </FormProvider>
  );
}
