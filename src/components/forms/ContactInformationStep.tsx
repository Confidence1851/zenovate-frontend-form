"use client";

import FormInputText from "../common/FormInputText";
import {
  Control,
  DeepMap,
  FieldError,
  FieldErrors,
  FieldValues,
  UseFormSetValue,
} from "react-hook-form";
import FormStreetAddress from "../common/FormStreetAddress";
import FormWrapper from "./FormWrapper";
import { useFormStore } from "@/stores/formStore";
import { useEffect } from "react";

type ContactInformationStepProps<
  TFormValues extends FieldValues = FieldValues
> = {
  control: Control<TFormValues>;
  errors: Partial<DeepMap<TFormValues, FieldError>> | FieldErrors<TFormValues>;
  setValue: UseFormSetValue<TFormValues>;
};
const ContactInformationStep = ({
  control,
  errors,
  setValue,
}: ContactInformationStepProps) => {
  const updateStepHighlight = useFormStore(
    (state) => state.updateStepHighlight
  );

  useEffect(() => {
    updateStepHighlight("info");
  }, []);
  return (
    <FormWrapper
      formTitle="contact information"
      formSubtitle="Fill in your location details"
    >
      <div className="flex flex-col gap-8">
        <FormStreetAddress
          control={control}
          name="streetAddress"
          errors={errors}
          label="Street Address"
          setValue={setValue}
        />
        <FormInputText
          control={control}
          name="city"
          errors={errors}
          label="City"
          updateLocalStorage={false}
        />

        <FormInputText
          control={control}
          name="stateProvince"
          errors={errors}
          label="State/Province"
          updateLocalStorage={false}
        />
        <FormInputText
          control={control}
          name="postalZipCode"
          errors={errors}
          label="postal code"
          updateLocalStorage={false}
        />
        <FormInputText
          control={control}
          name="country"
          errors={errors}
          label="country"
          updateLocalStorage={false}
        />
      </div>
    </FormWrapper>
  );
};

export default ContactInformationStep;
