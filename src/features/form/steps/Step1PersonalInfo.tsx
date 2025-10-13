import { useEffect } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { TextField, Button, Stack, MenuItem } from "@mui/material";
import { saveStep } from "../formSlice";
import type { RootState } from "../../../store";
import type { Step1Data } from "../../../types/form";

export default function Step1PersonalInfo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const defaultValues = useSelector((state: RootState) => state.form.step1);

  const {
    control,
    register,
    getValues,
    trigger,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<Step1Data>();

  useEffect(() => {
    if (!defaultValues) return;
    (Object.keys(defaultValues) as (keyof Step1Data)[]).forEach((key) => {
      const value = defaultValues[key];
      setValue(key, value, { shouldValidate: false, shouldDirty: false });
    });
  }, [defaultValues, setValue]);

  useEffect(() => {
    const subscription = watch((data) => {
      dispatch(saveStep({ step: 1, data }));
    });
    return () => subscription.unsubscribe();
  }, [watch, dispatch]);

  const handleNext = async () => {
    const requiredFields: (keyof Step1Data)[] = [
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

    const isValid = await trigger(requiredFields);
    if (isValid) {
      dispatch(saveStep({ step: 1, data: getValues() }));
      navigate("/apply/step2");
    }
  };

  const maxDate = dayjs().subtract(18, "year").format("YYYY-MM-DD");

  /** 🧩 4. UI */
  return (
    <Stack spacing={2} component="form">
      <TextField
        label={t("form.name")}
        {...register("name")}
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <TextField
        label={t("form.nationalId")}
        {...register("nationalId")}
        error={!!errors.nationalId}
        helperText={errors.nationalId?.message}
      />
      <Controller
        name="dob"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label={t("form.dob")}
            type="date"
            fullWidth
            slotProps={{
              inputLabel: { shrink: true },
              input: {
                tabIndex: 0,
                inputProps: { max: maxDate },
                onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.key === "Tab") return;
                  e.preventDefault();
                },
              },
            }}
            error={!!errors.dob}
            helperText={errors.dob?.message}
          />
        )}
      />
      <Controller
        name="gender"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            select
            label={t("form.gender")}
            fullWidth
            error={!!errors.gender}
            helperText={errors.gender?.message}
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Others">Others</MenuItem>
          </TextField>
        )}
      />
      <TextField
        label={t("form.address")}
        {...register("address")}
        error={!!errors.address}
        helperText={errors.address?.message}
      />
      <TextField
        label={t("form.city")}
        {...register("city")}
        error={!!errors.city}
        helperText={errors.city?.message}
      />
      <TextField
        label={t("form.state")}
        {...register("state")}
        error={!!errors.state}
        helperText={errors.state?.message}
      />
      <TextField
        label={t("form.country")}
        {...register("country")}
        error={!!errors.country}
        helperText={errors.country?.message}
      />
      <TextField
        type="number"
        label={t("form.phone")}
        {...register("phone")}
        error={!!errors.phone}
        helperText={errors.phone?.message}
      />
      <TextField
        label={t("form.email")}
        type="email"
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
      />

      <div className="flex justify-end gap-2">
        <Button variant="contained" onClick={handleNext}>
          {t("next")}
        </Button>
      </div>
    </Stack>
  );
}
