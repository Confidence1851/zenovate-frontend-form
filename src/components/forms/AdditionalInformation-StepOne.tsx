"use client";
import {
  Control,
  DeepMap,
  FieldError,
  FieldErrors,
  FieldValues,
} from "react-hook-form";
import FormWrapper from "./FormWrapper";

type AdditionalInformationStepOneFormProps<
  TFormValues extends FieldValues = FieldValues
> = {
  control: Control<TFormValues>;
  errors: Partial<DeepMap<TFormValues, FieldError>> | FieldErrors<TFormValues>;
};
import FormTextArea from "../common/FormTextArea";
import { useFormStore } from "@/stores/formStore";
import FormSelectYesOrNo from "../common/FormSelectYesOrNo";
import { useEffect } from "react";

const AdditionalInformationStepOne = ({
  control,
  errors,
}: AdditionalInformationStepOneFormProps) => {
  const updateFormData = useFormStore((state) => state.updateFormData);

  const hasConcernsInjectables =
    useFormStore((state) => state.formData["concernsInjectables"]) === "no"
      ? false
      : true;
  const hasNeedleFear =
    useFormStore((state) => state.formData["needleFear"]) === "no"
      ? false
      : true;

  const concernsInjectables = useFormStore(
    (state) => state.formData["concernsInjectables"]
  );
  const needleFear = useFormStore((state) => state.formData["needleFear"]);

  useEffect(() => {
    if (!hasConcernsInjectables)
      updateFormData("injectablesConcernsDetails", undefined);
  }, [hasConcernsInjectables]);

  useEffect(() => {
    if (!hasNeedleFear) updateFormData("needleConcernsDetails", undefined);
  }, [hasNeedleFear]);

  const updateStepHighlight = useFormStore(
    (state) => state.updateStepHighlight
  );

  useEffect(() => {
    updateStepHighlight("questions");
  }, []);

  return (
    <FormWrapper
      formTitle="Additional Information"
      formSubtitle="Please provide information about your concerns with injectables and any additional details"
    >
      <div className="flex flex-col gap-10 min-h-[500px]">
        <FormSelectYesOrNo
          control={control}
          errors={errors}
          name="concernsInjectables"
          label="Are you afraid or concerned with injectables?"
        />
        {hasConcernsInjectables && concernsInjectables && (
          <FormTextArea
            control={control}
            errors={errors}
            name="injectablesConcernsDetails"
            placeholder="Tell us about your concerns with injectables"
            rows={5}
          />
        )}
        <FormSelectYesOrNo
          control={control}
          errors={errors}
          name="needleFear"
          label="Are you afraid or concerned with needles?"
        />
        {hasNeedleFear && needleFear && (
          <FormTextArea
            control={control}
            errors={errors}
            name="needleConcernsDetails"
            placeholder="Tell us about your concerns with needles"
            rows={5}
          />
        )}
      </div>
    </FormWrapper>
  );
};

export default AdditionalInformationStepOne;
