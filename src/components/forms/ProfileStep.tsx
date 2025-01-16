'use client';

import FormDatePicker from '../common/FormDatePicker';
import FormInputText from '../common/FormInputText';
import {
  Control,
  DeepMap,
  FieldError,
  FieldErrors,
  FieldValues,
} from 'react-hook-form';
import FormWrapper from './FormWrapper';
import FormSelectPreferredContactMethod from '../common/FormSelectPreferredContactMethod';
import { useFormStore } from '@/stores/formStore';
import { useEffect } from 'react';

type ProfileStepFormProps<TFormValues extends FieldValues = FieldValues> = {
  control: Control<TFormValues>;
  errors:
  | Partial<DeepMap<TFormValues, FieldError>>
  | FieldErrors<TFormValues>;
};

const ProfileStep = ({ control, errors }: ProfileStepFormProps) => {
  const updateStepHighlight = useFormStore(
    (state) => state.updateStepHighlight,
  );
  const setCurrentFormStep = useFormStore.getState().setCurrentFormStep;
  

  useEffect(() => {
    // update the current step, used to style the sidebar
    setCurrentFormStep(1);
    updateStepHighlight('info');
  }, []);
  return (
    <FormWrapper
      formTitle="Your profile"
      formSubtitle="Tell us a bit about yourself"
    >
      <FormInputText
        control={control}
        name="firstName"
        errors={errors}
        label="First Name"
        placeholder="JOHN"
      />
      <FormInputText
        control={control}
        name="lastName"
        errors={errors}
        label="Last Name"
        placeholder="DOE"
      />
      <FormDatePicker
        control={control}
        name="dateOfBirth"
        errors={errors}
        label="Date of birth"
        disableToday
      />
      <FormInputText
        control={control}
        name="email"
        errors={errors}
        label="email address"
        placeholder="email@domain.com"
      />
      <FormInputText
        control={control}
        name="phoneNumber"
        errors={errors}
        label="phone number"
        type="number"
        placeholder="123-246-7890"
      />
      <FormSelectPreferredContactMethod
        control={control}
        name="preferredContact"
        errors={errors}
        label="Preferred contact method"
      />
    </FormWrapper>
  );
};

export default ProfileStep;
