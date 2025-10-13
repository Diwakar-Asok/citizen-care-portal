import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Stack,
  Box,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../store";
import { saveStep, resetForm } from "../formSlice";
import type { RootState } from "../../../store";
import type { Step3Data } from "../../../types/form";
import { submitForm } from "../../../services/formService";
import AiSuggestionModal from "../../../components/common/AiSuggestionModal";

export default function Step3Situation() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const formState = useAppSelector((s: RootState) => s.form);
  const defaultValues = formState.step3;

  const [modalOpen, setModalOpen] = useState(false);
  const [currentField, setCurrentField] = useState<keyof Step3Data | null>(null);

  const {
    register,
    getValues,
    setValue,
    trigger,
    reset,
    formState: { errors },
    watch,
  } = useFormContext<Step3Data>();

  useEffect(() => {
    if (!defaultValues) return;
    (Object.keys(defaultValues) as (keyof Step3Data)[]).forEach((key) => {
      const value = defaultValues[key];
      setValue(key, value, { shouldValidate: false, shouldDirty: false });
    });
   }, [defaultValues, setValue]);

  useEffect(() => {
    const subscription = watch((data) => {
      dispatch(saveStep({ step: 3, data }));
    });
    return () => subscription.unsubscribe();
  }, [watch, dispatch]);

  const handleOpenModal = (field: keyof Step3Data) => {
    setCurrentField(field);
    setModalOpen(true);
  };

  const handleAccept = (text: string) => {
    if (currentField) setValue(currentField, text);
  };

  // Validate all required fields before submitting
  const handleSubmitForm = async () => {
    const requiredFields: (keyof Step3Data)[] = [
      "financialSituation",
      "employmentCircumstances",
      "reasonForApplying",
    ];

    const isValid = await trigger(requiredFields);

    if (!isValid) return;

    const data = getValues();
    dispatch(saveStep({ step: 3, data })); 

    const step1 = formState.step1;
    const step2 = formState.step2;

    const step1Required = [
      "name", 
      "nationalId", 
      "dob", 
      "gender", 
      "address",
      "city",
      "state",
      "country",
      "phone",
      "email",
    ];
    const step2Required = [
      "maritalStatus", 
      "dependents", 
      "employmentStatus", 
      "monthlyIncome", 
      "housingStatus"
    ];

    const step1Incomplete = step1Required.some(key => !step1[key as keyof typeof step1]);
    const step2Incomplete = step2Required.some(key => !step2[key as keyof typeof step2]);

    if (step1Incomplete || step2Incomplete) {
      toast.error(t("pleaseCompletePreviousSteps")); // add this key in translations
      return;
    }
    
    try {
      await submitForm({ ...formState, step3: data });
      toast.success(t("formSuccessful"));
      setTimeout(() => {
        dispatch(resetForm());
        reset();
        navigate("/apply/step1"); 
      }, 1000);
    } catch {
      toast.error(t("formError"));
    }
  };

  const back = () => navigate("/apply/step2");

  return (
    <Stack spacing={4} component="form">
      {(
        [
          {
            field: "financialSituation",
            label: t("form.financialSituation"),
          },
          {
            field: "employmentCircumstances",
            label: t("form.employmentCircumstances"),
          },
          {
            field: "reasonForApplying",
            label: t("form.reasonForApplying"),
          },
        ] as { field: keyof Step3Data; label: string }[]
      ).map(({ field, label }) => (
        <Box key={field}>
          <Box className="flex items-center justify-between mb-1">
            <Typography variant="subtitle1" fontWeight={500}>
              {label}
            </Typography>
            <Button
              variant="outlined"
              size="small"
              onClick={() => handleOpenModal(field)}
            >
              {t("helpMeWrite")}
            </Button>
          </Box>
          <TextField
            fullWidth
            multiline
            rows={4}
            {...register(field)}
            error={!!errors[field]}
            helperText={errors[field]?.message}
          />
        </Box>
      ))}

      <Box className="flex justify-end gap-2">
        <Button onClick={back}>{t("back")}</Button>
        <Button variant="contained" onClick={handleSubmitForm}>
          {t("submit")}
        </Button>
      </Box>

      {modalOpen && currentField && (() => {
        const fieldLabels = [
          { field: "financialSituation", label: "Current Financial Situation" },
          { field: "employmentCircumstances", label: "Employment Circumstances" },
          { field: "reasonForApplying", label: "Reason for Applying" },
        ] as const;

        const currentLabel = fieldLabels.find(
          (item) => item.field === currentField
        )?.label || "";

        const currentValue = getValues(currentField);
        const needsHelp = /help|assist|write|describe/i.test(currentValue || "");

        const prompt =
          !currentValue || needsHelp
            ? `Write a concise, professional paragraph describing ${currentLabel.toLowerCase()} for a social support application.`
            : `Please improve and rewrite the following text professionally but concisely:\n\n${currentValue}`;

        return (
          <AiSuggestionModal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            onAccept={handleAccept}
            title={currentField}
            prompt={prompt}
          />
        );
      })()}
    </Stack>
  );
}
