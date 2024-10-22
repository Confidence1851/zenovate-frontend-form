'use client';

import { useMultistepForm } from '@/hooks/useMultiStepForm';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { formValidationSchema } from '@/schemas/formSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFormStore } from '@/stores/formStore';
import ProfileStep from '@/components/forms/ProfileStep';
import { Form } from '@/components/ui/form';
import ContactInformationStep from '@/components/forms/ContactInformationStep';
import { ArrowRight } from 'iconsax-react';
import FormProgressBar from '@/components/common/FormProgressBar';
import ProductSelectionStep from '@/components/forms/ProductSelectionStep';
import AllergiesAndMedicationsStep from '@/components/forms/AllergiesAndMedicationsStep';
import MedicalHistoryStepOne from '@/components/forms/MedicalHistory-StepOne';
import MedicalHistoryStepTwo from '@/components/forms/MedicalHistory-StepTwo';
import MedicalHistoryStepThree from '@/components/forms/MedicalHistory-StepThree';
import HealthUpdateStep from '@/components/forms/HealthUpdateStep';
import AdditionalInformationStepOne from '@/components/forms/AdditionalInformation-StepOne';
import AdditionalInformationStepTwo from '@/components/forms/AdditionalInformation-StepTwo';
import ConsentStep from '@/components/forms/ConsentStep';
import PaymentStep from '@/components/forms/PaymentStep';
import CheckoutBtn from '@/components/common/CheckoutBtn';
import { checkout } from '@/server-actions/stripe.actions';
import { Button } from '@/components/ui/button';
import { formConditionalFields, formFields } from '@/utils/formFields';

const FormPage = () => {
	const formData = useFormStore((state) => state.formData);
	const currentStepIndex = useFormStore((state) => state.currentStepIndex);
	const totalPrice = useFormStore((state) => state.totalPrice);
	const sessionId = useFormStore((state) => state.sessionId);
	const paid = useFormStore((state) => state.paid);

	const hasHydrated = useFormStore.persist.hasHydrated();
	const form = useForm({
		resolver: zodResolver(formValidationSchema[currentStepIndex]),
		mode: 'all',
	});

	const {
		control,
		setValue,
		handleSubmit,
		watch,
		formState: { errors },
	} = form;

	useEffect(() => {
		//on hydration, update from fields from data stored in localstorage
		if (hasHydrated) {
			const hydrateValues = () => {
				formFields.forEach((field) => {
					if (field === 'consentAgreement') {
						setValue(field, formData[field] || false);
					} else {
						setValue(field, formData[field] || '');
					}
				});
				formConditionalFields.forEach(({ key, details }) => {
					if (formData[key] === 'yes') {
						setValue(details, formData[details]);
					}
				});
				setValue(
					'dateOfBirth',
					formData['dateOfBirth']
						? new Date(formData['dateOfBirth'])
						: null,
				);
				setValue(
					'lastCheckupDate',
					formData['lastCheckupDate']
						? new Date(formData['lastCheckupDate'])
						: new Date(),
				);
			};

			hydrateValues();
		}
	}, [hasHydrated]);

	//  watch if street value changes and update related fields
	const street = watch('streetAddress');

	useEffect(() => {
		setValue('postalZipCode', formData['postalZipCode']);
		setValue('city', formData['city']);
		setValue('stateProvince', formData['stateProvince']);
		setValue('country', formData['country']);
	}, [street]);

	const steps = useMemo(
		() => [
			<ProfileStep control={control} errors={errors} />,
			<ContactInformationStep
				control={control}
				errors={errors}
				setValue={setValue}
			/>,
			<ProductSelectionStep
				control={control}
				errors={errors}
				setValue={setValue}
			/>,
			<PaymentStep />,
			<AllergiesAndMedicationsStep control={control} errors={errors} />,
			<MedicalHistoryStepOne control={control} errors={errors} />,
			<MedicalHistoryStepTwo control={control} errors={errors} />,
			<MedicalHistoryStepThree control={control} errors={errors} />,
			<HealthUpdateStep control={control} errors={errors} />,
			<AdditionalInformationStepOne control={control} errors={errors} />,
			<AdditionalInformationStepTwo control={control} errors={errors} />,
			<ConsentStep control={control} errors={errors} />,
		],
		[control, errors, setValue],
	);

	const { step, isLastStep, next } = useMultistepForm(steps);
	const stepHighlight = useFormStore((state) => state.stepHighlight);

	const onSubmit = async () => {
		//trigger stripe payment when it is on the payment stageF
		if (stepHighlight === 'payment' && !paid) {
			const transaction = {
				amount: totalPrice.toFixed(2),
				plan: 'Monthly plan',
				buyerId: formData['email'],
				sessionId,
			};
			return await checkout(transaction);
		}
		if (!isLastStep) return next();
		console.log(formData);
	};

	return (
		<div className="w-full max-w-[900px] ">
			<div className="lg:hidden">
				<FormProgressBar className="justify-center" />
			</div>
			<Form {...form}>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="space-y-8 py-4"
				>
					{step}
					<div className="flex flex-col justify-end gap-4">
						{stepHighlight === 'payment' && !paid ? (
							<CheckoutBtn />
						) : (
							<Button
								variant={'green'}
								size={'lg'}
								type="submit"
								className="w-full flex justify-between items-center"
							>
								<span className="uppercase">
									{isLastStep ? 'Finish' : 'Next'}
								</span>
								<ArrowRight
									size="24"
									className="text-secondary-foreground"
								/>
							</Button>
						)}
					</div>
				</form>
			</Form>
			<div className="hidden lg:block">
				<FormProgressBar className="justify-end" />
			</div>
		</div>
	);
};

export default FormPage;
