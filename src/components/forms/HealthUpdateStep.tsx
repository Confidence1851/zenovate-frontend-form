"use client";
import {
  Control,
  DeepMap,
  FieldError,
  FieldErrors,
  FieldValues,
} from "react-hook-form";
import FormWrapper from "./FormWrapper";

type HealthUpdateStepFormProps<TFormValues extends FieldValues = FieldValues> =
  {
    control: Control<TFormValues>;
    errors:
      | Partial<DeepMap<TFormValues, FieldError>>
      | FieldErrors<TFormValues>;
  };
import FormTextArea from "../common/FormTextArea";
import { useFormStore } from "@/stores/formStore";
import FormSelectYesOrNo from "../common/FormSelectYesOrNo";
import { useEffect } from "react";
import FormDatePicker from "../common/FormDatePicker";

const HealthUpdateStep = ({ control, errors }: HealthUpdateStepFormProps) => {
  const updateFormData = useFormStore((state) => state.updateFormData);

  const hasRecentHealthChanges =
    useFormStore((state) => state.formData["recentHealthChanges"]) === "no"
      ? false
      : true;

  const recentHealthChanges = useFormStore(
    (state) => state.formData["recentHealthChanges"]
  );

  useEffect(() => {
    if (!hasRecentHealthChanges)
      updateFormData("healthChangesDetails", undefined);
  }, [hasRecentHealthChanges]);
  const updateStepHighlight = useFormStore(
    (state) => state.updateStepHighlight
  );

  useEffect(() => {
    updateStepHighlight("questions");
  }, []);

  return (
    <FormWrapper
      formTitle="Health Update"
      formSubtitle="Update us on your recent health check-up and any changes"
    >
      <div className="flex flex-col gap-10 min-h-[500px]">
        <FormDatePicker
          control={control}
          name="lastCheckupDate"
          errors={errors}
          label="When was the last date of your medical check-up"
        />

        <FormSelectYesOrNo
          control={control}
          errors={errors}
          name="recentHealthChanges"
          label="Have you had any recent health changes?"
        />
        {hasRecentHealthChanges && recentHealthChanges && (
          <FormTextArea
            control={control}
            errors={errors}
            name="healthChangesDetails"
            placeholder="Tell us more"
            rows={5}
          />
        )}
      </div>
    </FormWrapper>
  );
};

export default HealthUpdateStep;
