"use client";
import {
  Control,
  DeepMap,
  FieldError,
  FieldErrors,
  FieldValues,
} from "react-hook-form";
import FormWrapper from "./FormWrapper";

type MedicalHistoryStepTwoFormProps<
  TFormValues extends FieldValues = FieldValues
> = {
  control: Control<TFormValues>;
  errors: Partial<DeepMap<TFormValues, FieldError>> | FieldErrors<TFormValues>;
};
import FormTextArea from "../common/FormTextArea";
import { useFormStore } from "@/stores/formStore";
import FormSelectYesOrNo from "../common/FormSelectYesOrNo";
import { useEffect } from "react";

const MedicalHistoryStepTwo = ({
  control,
  errors,
}: MedicalHistoryStepTwoFormProps) => {
  const updateFormData = useFormStore((state) => state.updateFormData);

  const hasHeartDisease =
    useFormStore((state) => state.formData["heartDisease"]) === "no"
      ? false
      : true;
  const hasKidneyDisease =
    useFormStore((state) => state.formData["kidneyDisease"]) === "no"
      ? false
      : true;
  const hasLiverDisease =
    useFormStore((state) => state.formData["liverDisease"]) === "no"
      ? false
      : true;

  const heartDisease = useFormStore((state) => state.formData["heartDisease"]);
  const kidneyDisease = useFormStore(
    (state) => state.formData["kidneyDisease"]
  );
  const liverDisease = useFormStore((state) => state.formData["liverDisease"]);

  useEffect(() => {
    if (!hasHeartDisease) updateFormData("heartDiseaseDetails", undefined);
  }, [hasHeartDisease]);

  useEffect(() => {
    if (!hasKidneyDisease) updateFormData("kidneyDiseaseDetails", undefined);
  }, [hasKidneyDisease]);
  useEffect(() => {
    if (!hasLiverDisease) updateFormData("liverDiseaseDetails", undefined);
  }, [hasLiverDisease]);
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
        {/* Heart disease */}
        <FormSelectYesOrNo
          control={control}
          errors={errors}
          name="heartDisease"
          label="Have you previously had heart disease?"
        />
        {hasHeartDisease && heartDisease && (
          <FormTextArea
            control={control}
            errors={errors}
            name="heartDiseaseDetails"
            placeholder="Please provide more details on the condition"
            rows={5}
          />
        )}
        {/* Kidney disease */}
        <FormSelectYesOrNo
          control={control}
          errors={errors}
          name="kidneyDisease"
          label="Have you previously had kidney disease?"
        />
        {hasKidneyDisease && kidneyDisease && (
          <FormTextArea
            control={control}
            errors={errors}
            name="kidneyDiseaseDetails"
            placeholder="Please provide more details on the condition"
            rows={5}
          />
        )}
        {/* Liver disease */}
        <FormSelectYesOrNo
          control={control}
          errors={errors}
          name="liverDisease"
          label="Have you previously had liver disease?"
        />
        {hasLiverDisease && liverDisease && (
          <FormTextArea
            control={control}
            errors={errors}
            name="liverDiseaseDetails"
            placeholder="Please provide more details on the condition"
            rows={5}
          />
        )}
      </div>
    </FormWrapper>
  );
};

export default MedicalHistoryStepTwo;
