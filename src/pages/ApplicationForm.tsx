import { Routes, Route, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ProgressBar from "../components/common/ProgressBar";
import Step1PersonalInfo from "../features/form/steps/Step1PersonalInfo";
import Step2FamilyInfo from "../features/form/steps/Step2FamilyInfo";
import Step3Situation from "../features/form/steps/Step3Situation";
import LanguageSwitcher from "../components/common/LanguageSwitcher";

export default function ApplicationForm() {
  const { t } = useTranslation();
  const location = useLocation();

  // derive current step from route
  const currentStep =
    location.pathname.includes("step3")
      ? 3
      : location.pathname.includes("step2")
      ? 2
      : 1;

  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* 🔹 Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">{t("title")}</h1>
          <p className="text-sm text-gray-500">
            {t("step")} {currentStep} / 3
          </p>
        </div>
        <LanguageSwitcher />
      </div>

      {/* 🔹 Global progress bar (Redux-based, auto-calculated) */}
      <ProgressBar />

      {/* 🔹 Step Routes */}
      <div className="mt-6">
        <Routes>
          <Route path="step1" element={<Step1PersonalInfo />} />
          <Route path="step2" element={<Step2FamilyInfo />} />
          <Route path="step3" element={<Step3Situation />} />
        </Routes>
      </div>
    </div>
  );
}
