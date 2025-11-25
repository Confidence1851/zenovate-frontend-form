'use client';

import { useMultistepForm } from '@/hooks/useMultiStepForm';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { formValidationSchema } from '@/schemas/formSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFormStore } from '@/stores/formStore';
import ProfileStep from '@/components/forms/ProfileStep';
import { Form } from '@/components/ui/form';
import ContactInformationStep from '@/components/forms/ContactInformationStep';
import {  ArrowRight } from 'iconsax-react';
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
import { Button } from '@/components/ui/button';
import { formConditionalFields, formFields } from '@/utils/formFields';
import { updateSession, getSession } from '@/server-actions/api.actions';
import { usePathname, useSearchParams } from 'next/navigation';
import { FormContext } from '@/utils/contexts';
import ProductPricingSelectionStep from '@/components/forms/ProductPricingSelectionStep';

import CircularProgressBar from '@/components/forms/CircularProgressBar';

const FormPage = () => {
	const pathname = usePathname();
	const stat_ = useFormStore((state) => state);
	const formData = useFormStore((state) => state.formData);
	const updateFormData = useFormStore((state) => state.updateFormData);
	const currentStepIndex = useFormStore((state) => state.currentStepIndex);
	const sessionId = useFormStore((state) => state.sessionId);
	const selectedProducts = useFormStore((state) => state.selectedProducts);
	const setSessionId = useFormStore.getState().setSessionId;
	const setFormData = useFormStore.getState().setFormData;
	const resetState = useFormStore.getState().resetState;
	const setSelectedProducts = useFormStore.getState().setSelectedProducts;
	const [formSession, setFormSession] = useState<any | null | undefined>(
		undefined,
	);
	const [isComplete, setIsComplete] = useState<any | null | undefined>(
		undefined,
	);

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

	//  watch if street value changes and update related fields
	const street = watch('streetAddress');

	useEffect(() => {
		updateFormData('streetAddress', street);
		setValue('postalZipCode', formData['postalZipCode']);
		setValue('city', formData['city']);
		setValue('stateProvince', formData['stateProvince']);
		setValue('country', formData['country']);
	}, [street]);

	useEffect(() => {
		//on hydration, update from fields from data stored in localstorage
		if (hasHydrated) {
			const hydrateValues = () => {
				setValue('sessionId', stat_['sessionId'] || '');

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

	useEffect(() => {
		if (isComplete != undefined) {
			resetState();
			resetState();
			window.location.href = isComplete.redirect_url;
		}
	}, [isComplete]);

	useEffect(() => {
		if (isComplete == undefined) {
			validateSession();
		}		
	}, [sessionId, pathname]);

	function validateSession() {
		const url_id = pathname?.split('/').pop() ?? '';
		if (url_id != sessionId) {
			return restartSession(url_id, true);
		}
		getSession(sessionId).then((v) => {
			if (v.success) {
				setFormSession(v.data);
				return;
			}
			return restartSession(sessionId, false);
		});
	}

	async function restartSession(id: string, check: boolean) {
		if (check) {
			const v = await getSession(id);
			if (v.success) {
				const session = v.data;
				setFormSession(session);
				setSessionId(session?.id ?? '');
				setFormData(session?.formData ?? {});
				setSelectedProducts(session?.formData?.selectedProducts ?? []);
				window.location.href = '/form/' + (session?.id ?? '');
				return;
			}
		}

		resetState();
		window.location.href = '/';
		return;
	}

	let stepsList = [
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
		<ProductPricingSelectionStep
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
	];

	const steps = useMemo(() => stepsList, [control, errors, setValue]);

	const {
		currentFormStep,
		setCurrentFormStepNext,
		setCurrentFormStepBack,
		step,
		isLastStep,
		next,
		steps: totalSteps,
		back: goToPreviousStep,
	} = useMultistepForm(steps);

	const totalNoForms = totalSteps.length;
	const stepHighlight = useFormStore((state) => state.stepHighlight);

	const onSubmit = async () => {
		setIsComplete(undefined);
		formData['selectedProducts'] = selectedProducts;
		
		// Include discount_code if it exists in formData
		const updateData: any = {
			sessionId: sessionId,
			step: stepHighlight,
			formData: formData,
		};
		if (formData['discount_code']) {
			updateData.discount_code = formData['discount_code'];
		}

		const response = await updateSession(updateData);

		if (!(response.success ?? false)) {
			return;
		}
		if (currentFormStep <= totalNoForms) {
			setCurrentFormStepNext();
		}
		if (stepHighlight === 'product' && response?.data?.paid) {
			next();
			next();
			return next();
		}
		if (stepHighlight === 'payment') {
			if (response?.data?.redirect_url) {
				return (window.location.href = response.data.redirect_url);
			}

			if (!response?.data?.paid) {
				return;
			}
		}
		if (stepHighlight === 'sign') {
			setIsComplete(response.data);
			return;
		}
		if (!isLastStep) return next();
	};

	return (
		<>
			{isComplete ? <>
				{/* Show loading state here on redirect */}
				<div>Loading state</div>
			</>
				:
				<div className="w-full max-w-[900px] ">
					{/* <div className="lg:hidden">
				<FormProgressBar className="justify-center" />
			</div> */}
					<div className="w-full justify-center flex pt-2 sm:pt-5 pb-1 sm:pb-3">
						{/* <span>
					{currentFormStep} / {totalNoForms}
				</span> */}
						<CircularProgressBar
							step={currentFormStep}
							totalSteps={totalNoForms}
						/>
					</div>
					<FormContext.Provider value={{ formSession, setFormSession }}>
						<Form {...form}>
							<form
								onSubmit={handleSubmit(onSubmit)}
								className="space-y-8 py-4"
							>
								{step}
								<div
									className={`flex flex-wrap ${currentFormStep > 1 ? 'justify-between' : 'justify-end'}  gap-4`}
								>
									{currentFormStep > 1 && (
										<Button
											variant={'green'}
											size={'lg'}
											type="button"
											onClick={() => {
												goToPreviousStep();
												setCurrentFormStepBack();
											}}
											className=" w-[130px] flex justify-between items-center"
										>
											{/* <ArrowLeft
										size="20"
										className="text-secondary-foreground"
									/> */}
											<span className="uppercase">Previous</span>
										</Button>
									)}
									<Button
										variant={'green'}
										size={'lg'}
										type="submit"
										className={` ${currentFormStep <= 1 ? 'w-full justify-between' : 'w-[130px] justify-end'} flex  items-center`}
									>
										<span className="uppercase">
											{isLastStep ? 'Submit' : 'Next'}
										</span>
										{currentFormStep <= 1 && (
											<ArrowRight
												size="24"
												className="text-secondary-foreground"
											/>
										)}
									</Button>
								</div>
							</form>
						</Form>

						{/* <div className="hidden lg:block">
					<FormProgressBar className="justify-end" />
				</div> */}
					</FormContext.Provider>
				</div>
			}
		</>
	);
};

export default FormPage;
