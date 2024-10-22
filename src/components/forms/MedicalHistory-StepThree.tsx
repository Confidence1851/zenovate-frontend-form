"use client";
import {
  Control,
  DeepMap,
  FieldError,
  FieldErrors,
  FieldValues,
} from "react-hook-form";
import FormWrapper from "./FormWrapper";

type MedicalHistoryStepThreeFormProps<
  TFormValues extends FieldValues = FieldValues
> = {
  control: Control<TFormValues>;
  errors: Partial<DeepMap<TFormValues, FieldError>> | FieldErrors<TFormValues>;
};
import FormTextArea from "../common/FormTextArea";
import { useFormStore } from "@/stores/formStore";
import FormSelectYesOrNo from "../common/FormSelectYesOrNo";
import { useEffect } from "react";

const MedicalHistoryStepThree = ({
  control,
  errors,
}: MedicalHistoryStepThreeFormProps) => {
  const updateFormData = useFormStore((state) => state.updateFormData);

  const hasAutoimmuneDisorders =
    useFormStore((state) => state.formData["autoimmuneDisorders"]) === "no"
      ? false
      : true;
  const hasOtherConditions =
    useFormStore((state) => state.formData["otherConditions"]) === "no"
      ? false
      : true;

  const autoimmuneDisorders = useFormStore(
    (state) => state.formData["autoimmuneDisorders"]
  );
  const otherConditions = useFormStore(
    (state) => state.formData["otherConditions"]
  );

  useEffect(() => {
    if (!hasAutoimmuneDisorders)
      updateFormData("autoimmuneDisordersDetails", undefined);
  }, [hasAutoimmuneDisorders]);

  useEffect(() => {
    if (!hasOtherConditions)
      updateFormData("otherConditionsDetails", undefined);
  }, [hasOtherConditions]);

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
        {/* Autoimmune Disorder */}
        <FormSelectYesOrNo
          control={control}
          errors={errors}
          name="autoimmuneDisorders"
          label="Have you ever had any autoimmune disorders?"
        />
        {hasAutoimmuneDisorders && autoimmuneDisorders && (
          <FormTextArea
            control={control}
            errors={errors}
            name="autoimmuneDisordersDetails"
            placeholder="Specify which and please provide more details on the conditions?"
            rows={5}
          />
        )}
        {/* Other conditions */}
        <FormSelectYesOrNo
          control={control}
          errors={errors}
          name="otherConditions"
          label="Do you have any other conditions?"
        />
        {hasOtherConditions && otherConditions && (
          <FormTextArea
            control={control}
            errors={errors}
            name="otherConditionsDetails"
            placeholder="Please specify what are they and details on their condition"
            rows={5}
          />
        )}
      </div>
    </FormWrapper>
  );
};

export default MedicalHistoryStepThree;
