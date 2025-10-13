// src/components/common/ProgressBar.tsx
import { useAppSelector } from "../../store";
import { calculateProgress } from "../../utils/formProgress";
import { useTranslation } from "react-i18next";

export default function ProgressBar() {
  const { t } = useTranslation();
  const formState = useAppSelector((state) => state.form);
  const percent = calculateProgress(formState);
  console.log("Progress percent:", percent, formState);
  return (
    <div className="w-full">
      <div className="h-2 w-full rounded-full bg-gray-200">
        <div
          className="h-2 rounded-full bg-blue-600 transition-all duration-300 ease-in-out"
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="mt-2 text-sm text-gray-600 text-right">
        {percent}% {t("complete")}
      </p>
    </div>
  );
}
