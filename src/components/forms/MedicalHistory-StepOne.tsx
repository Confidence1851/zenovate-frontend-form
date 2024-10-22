"use client";
import {
  Control,
  DeepMap,
  FieldError,
  FieldErrors,
  FieldValues,
} from "react-hook-form";
import FormWrapper from "./FormWrapper";

type MedicalHistoryStepOneFormProps<
  TFormValues extends FieldValues = FieldValues
> = {
  control: Control<TFormValues>;
  errors: Partial<DeepMap<TFormValues, FieldError>> | FieldErrors<TFormValues>;
};
import FormTextArea from "../common/FormTextArea";
import { useFormStore } from "@/stores/formStore";
import FormSelectYesOrNo from "../common/FormSelectYesOrNo";
import { useEffect } from "react";

const MedicalHistoryStepOne = ({
  control,
  errors,
}: MedicalHistoryStepOneFormProps) => {
  const updateFormData = useFormStore((state) => state.updateFormData);

  const hasExistingConditions =
    useFormStore((state) => state.formData["existingConditions"]) === "no"
      ? false
      : true;
  const hasSurgeries =
    useFormStore((state) => state.formData["previousSurgeries"]) === "no"
      ? false
      : true;

  const existingConditions = useFormStore(
    (state) => state.formData["existingConditions"]
  );
  const previousSurgeries = useFormStore(
    (state) => state.formData["previousSurgeries"]
  );

  useEffect(() => {
    if (!hasExistingConditions) updateFormData("conditionsDetails", undefined);
  }, [hasExistingConditions]);

  useEffect(() => {
    if (!hasSurgeries) updateFormData("surgeriesDetails", undefined);
  }, [hasSurgeries]);
  const updateStepHighlight = useFormStore(
    (state) => state.updateStepHighlight
  );

  useEffect(() => {
    updateStepHighlight("questions");
  }, []);

  return (
    <FormWrapper
      formTitle="Medical History"
      formSubtitle="Please provide details about your medical history"
    >
      <div className="flex flex-col gap-10 min-h-[500px]">
        <FormSelectYesOrNo
          control={control}
          errors={errors}
          name="existingConditions"
          label="Do you have existing medical conditions?"
        />
        {hasExistingConditions && existingConditions && (
          <FormTextArea
            control={control}
            errors={errors}
            name="conditionsDetails"
            placeholder="Please provide more details on the condition"
            rows={5}
          />
        )}
        <FormSelectYesOrNo
          control={control}
          errors={errors}
          name="previousSurgeries"
          label="Have you had previous surgeries?"
        />
        {hasSurgeries && previousSurgeries && (
          <FormTextArea
            control={control}
            errors={errors}
            name="surgeriesDetails"
            placeholder="Please provide more details on the surgeries"
            rows={5}
          />
        )}
      </div>
    </FormWrapper>
  );
};

export default MedicalHistoryStepOne;
