import { useEffect } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Stack, MenuItem } from "@mui/material";
import { saveStep } from "../formSlice";
import type { RootState } from "../../../store";
import type { Step2Data } from "../../../types/form";

export default function Step2FamilyInfo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const defaultValues = useSelector((state: RootState) => state.form.step2);

  const {
    control,
    register,
    getValues,
    trigger,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<Step2Data>();

  // Load default values once safely
  useEffect(() => {
    if (!defaultValues) return;
    (Object.keys(defaultValues) as (keyof Step2Data)[]).forEach((key) => {
      const value = defaultValues[key];
      setValue(key, value, { shouldValidate: false, shouldDirty: false });
    });
  }, [defaultValues, setValue]);

  useEffect(() => {
    const subscription = watch((data) => {
      dispatch(saveStep({ step: 2, data }));
    });
    return () => subscription.unsubscribe();
  }, [watch, dispatch]);

  // Validate required fields before moving to Step3
  const handleNext = async () => {
    const requiredFields: (keyof Step2Data)[] = [
      "maritalStatus",
      "dependents",
      "employmentStatus",
      "monthlyIncome",
      "housingStatus",
    ];

    const isValid = await trigger(requiredFields);
   
    if (isValid) {
      dispatch(saveStep({ step: 2, data: getValues() }));
      navigate("/apply/step3");
    }
  };

  const back = () => navigate("/apply/step1");

  return (
    <Stack spacing={2} component="form">
      <Controller
      name="maritalStatus"
      control={control}
      render={({ field }) => (
      <TextField
        {...field}
        select
        label={t("form.maritalStatus")}
        fullWidth
        error={!!errors.maritalStatus}
        helperText={errors.maritalStatus?.message}
        slotProps={{
          inputLabel: { shrink: true },
        }}
      >
        <MenuItem value="Single">Single</MenuItem>
        <MenuItem value="Married">Married</MenuItem>
        <MenuItem value="Divorced">Divorced</MenuItem>
        <MenuItem value="Widowed">Widowed</MenuItem>
      </TextField>
    )}
    />
      <TextField
        label={t("form.dependents")}
        type="number"
        {...register("dependents")}
        error={!!errors.dependents}
        helperText={errors.dependents?.message}
      />
      <Controller
        name="employmentStatus"
        control={control}
        render={({ field }) => (
        <TextField
          {...field}
          select
          label={t("form.employmentStatus")}
          fullWidth
          error={!!errors.employmentStatus}
          helperText={errors.employmentStatus?.message}
          slotProps={{
            inputLabel: { shrink: true },
          }}>
          <MenuItem value="Employed">Employed</MenuItem>
          <MenuItem value="Self-Employed">Self-Employed</MenuItem>
          <MenuItem value="Unemployed">Unemployed</MenuItem>
          <MenuItem value="Student">Student</MenuItem>
          <MenuItem value="Retired">Retired</MenuItem>
        </TextField>
        )}
      />
      <TextField
        label={t("form.monthlyIncome")}
        type="number"
        {...register("monthlyIncome")}
        error={!!errors.monthlyIncome}
        helperText={errors.monthlyIncome?.message}
      />
      <TextField
        label={t("form.housingStatus")}
        {...register("housingStatus")}
        error={!!errors.housingStatus}
        helperText={errors.housingStatus?.message}
      />

      <div className="flex justify-end gap-2">
        <Button onClick={back}>{t("back")}</Button>
        <Button variant="contained" onClick={handleNext}>
          {t("next")}
        </Button>
      </div>
    </Stack>
  );
}
