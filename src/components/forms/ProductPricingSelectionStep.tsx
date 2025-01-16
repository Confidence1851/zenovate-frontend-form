"use client";

import {
  Control,
  DeepMap,
  FieldError,
  FieldErrors,
  UseFormSetValue,
  FieldValues,
} from "react-hook-form";
import FormWrapper from "./FormWrapper";
import FormProductSelection from "../common/FormProductSelection";
import { useFormStore } from "@/stores/formStore";
import { useEffect } from "react";
import FormProductPriceSelection from "../common/FormProductPriceSelection";

type ProductPricingSelectionStepFormProps<
  TFormValues extends FieldValues = FieldValues
> = {
  control: Control<TFormValues>;
  errors: Partial<DeepMap<TFormValues, FieldError>> | FieldErrors<TFormValues>;
  setValue: UseFormSetValue<FieldValues>;
};

const ProductPricingSelectionStep = ({
  control,
  errors,
  setValue,
}: ProductPricingSelectionStepFormProps) => {
  const updateStepHighlight = useFormStore(
    (state) => state.updateStepHighlight
  );


  useEffect(() => {
    updateStepHighlight("product");
  }, []);

  return (
    <FormWrapper
      formTitle="Product Pricing Selection"
      formSubtitle="Please select the products you are interested in"
    >
      <div className="pb-8">
        <FormProductPriceSelection
          control={control}
          name="selectedProductPrices"
          errors={errors}
          setValue={setValue}
        />
      </div>
    </FormWrapper>
  );
};

export default ProductPricingSelectionStep;
