"use client";
import {
  Control,
  DeepMap,
  FieldError,
  FieldErrors,
  FieldValues,
} from "react-hook-form";
import FormWrapper from "./FormWrapper";

type AdditionalInformationStepTwoFormProps<
  TFormValues extends FieldValues = FieldValues
> = {
  control: Control<TFormValues>;
  errors: Partial<DeepMap<TFormValues, FieldError>> | FieldErrors<TFormValues>;
};
import FormTextArea from "../common/FormTextArea";
import { useFormStore } from "@/stores/formStore";
import { useEffect } from "react";

const AdditionalInformationStepTwo = ({
  control,
  errors,
}: AdditionalInformationStepTwoFormProps) => {
  const updateStepHighlight = useFormStore(
    (state) => state.updateStepHighlight
  );

  useEffect(() => {
    updateStepHighlight("questions");
  }, []);

  return (
    <FormWrapper
      formTitle="Additional Information"
      formSubtitle="Update us on your recent health check-up and any changes"
    >
      <div className="flex flex-col gap-10 min-h-[500px]">
        <FormTextArea
          control={control}
          errors={errors}
          name="familyMedicalHistory"
          placeholder="please tell us about your family medical history"
          rows={5}
        />

        <FormTextArea
          control={control}
          errors={errors}
          name="additionalInfo"
          placeholder="Additional Information"
          rows={5}
        />
      </div>
    </FormWrapper>
  );
};

export default AdditionalInformationStepTwo;
