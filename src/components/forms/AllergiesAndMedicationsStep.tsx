"use client";
import {
  Control,
  DeepMap,
  FieldError,
  FieldErrors,
  FieldValues,
} from "react-hook-form";
import FormWrapper from "./FormWrapper";

type AllergiesAndMedicationsFormProps<
  TFormValues extends FieldValues = FieldValues
> = {
  control: Control<TFormValues>;
  errors: Partial<DeepMap<TFormValues, FieldError>> | FieldErrors<TFormValues>;
};
import FormTextArea from "../common/FormTextArea";
import { useFormStore } from "@/stores/formStore";
import FormSelectYesOrNo from "../common/FormSelectYesOrNo";
import { useEffect } from "react";

const AllergiesAndMedications = ({
  control,
  errors,
}: AllergiesAndMedicationsFormProps) => {
  const updateFormData = useFormStore((state) => state.updateFormData);

  const isAllergic =
    useFormStore((state) => state.formData["allergies"]) === "no"
      ? false
      : true;
  const hasMedications =
    useFormStore((state) => state.formData["currentMedications"]) === "no"
      ? false
      : true;

  const allergies = useFormStore((state) => state.formData["allergies"]);
  const currentMedications = useFormStore(
    (state) => state.formData["currentMedications"]
  );

  useEffect(() => {
    if (!isAllergic) updateFormData("allergiesDetails", undefined);
  }, [isAllergic]);

  useEffect(() => {
    if (!hasMedications) updateFormData("medicationsDetails", undefined);
  }, [hasMedications]);
  const updateStepHighlight = useFormStore(
    (state) => state.updateStepHighlight
  );
  const setCurrentFormStep = useFormStore.getState().setCurrentFormStep;
    const setCurrentStepIndex = useFormStore.getState().setCurrentStepIndex;

  useEffect(() => {
    setCurrentFormStep(6);
    updateStepHighlight("questions");
  }, []);

  return (
    <FormWrapper
      formTitle="Allergies and Medications"
      formSubtitle="Please provide information about your allergies and current medications"
    >
      <div className="flex flex-col gap-10 min-h-[500px]">
        <FormSelectYesOrNo
          control={control}
          errors={errors}
          name="allergies"
          label="Allergies"
        />
        {isAllergic && allergies && (
          <FormTextArea
            control={control}
            errors={errors}
            name="allergiesDetails"
            placeholder="Please specify your allergies"
            rows={5}
          />
        )}
        <FormSelectYesOrNo
          control={control}
          errors={errors}
          name="currentMedications"
          label="Current Medications"
        />
        {hasMedications && currentMedications && (
          <FormTextArea
            control={control}
            errors={errors}
            name="medicationsDetails"
            placeholder="Please list your current medications"
            rows={5}
          />
        )}
      </div>
    </FormWrapper>
  );
};

export default AllergiesAndMedications;
