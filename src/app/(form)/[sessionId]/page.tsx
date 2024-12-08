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
import { Button } from '@/components/ui/button';
import { formConditionalFields, formFields } from '@/utils/formFields';
import { updateSession, getSession } from '@/server-actions/api.actions';
import { usePathname, useSearchParams } from 'next/navigation';
import { FormContext } from '@/utils/contexts';

const FormPage = () => {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const stat_ = useFormStore((state) => state);
	const formData = useFormStore((state) => state.formData);
	const currentStepIndex = useFormStore((state) => state.currentStepIndex);
	const totalPrice = useFormStore((state) => state.totalPrice);
	const sessionId = useFormStore((state) => state.sessionId);
	const paid = useFormStore((state) => state.paid);
	const selectedProducts = useFormStore((state) => state.selectedProducts);
	const setSessionId = useFormStore.getState().setSessionId;
	const setFormData = useFormStore.getState().setFormData;
	const setCurrentStepIndex = useFormStore.getState().setCurrentStepIndex;
	const setSelectedProducts = useFormStore.getState().setSelectedProducts;
	const [formSession, setFormSession] = useState<any | null | undefined>(undefined);

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

	//  watch if street value changes and update related fields
	const street = watch('streetAddress');

	useEffect(() => {
		setValue('postalZipCode', formData['postalZipCode']);
		setValue('city', formData['city']);
		setValue('stateProvince', formData['stateProvince']);
		setValue('country', formData['country']);
	}, [street]);

	useEffect(() => {
		validateSession();
	}, [sessionId, pathname]);

	function validateSession() {
		const url_id = pathname.replace('/', '');
		// console.log(url_id, sessionId);
		if (url_id != sessionId) {
			return restartSession(url_id, true);
		}
		getSession(sessionId).then((v) => {
			// console.log("Session", v);
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
				// console.log(session);
				setFormSession(session);
				setSessionId(session?.id ?? '');
				setFormData(session?.formData ?? {});
				setSelectedProducts(session?.formData?.selectedProducts ?? []);
				window.location.href = '/' + (session?.id ?? '');
				return;
			}
		}
		// console.log("Redirecting back");

		setSessionId('');
		// setFormData({});
		setSelectedProducts([]);
		setCurrentStepIndex(0);
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


	const steps = useMemo(
		() => stepsList,
		[control, errors, setValue],
	);

	const { step, isLastStep, next } = useMultistepForm(steps);
	const stepHighlight = useFormStore((state) => state.stepHighlight);

	const onSubmit = async () => {
		// console.log("Form data", formData)
		//trigger stripe payment when it is on the payment stageF
		formData['selectedProducts'] = selectedProducts;
		const response = await updateSession({
			sessionId: sessionId,
			step: stepHighlight,
			formData: formData,
		});
		console.log("Update response", response);
		if (!(response.success ?? false)) {
			return;
		}
		if (stepHighlight === 'product' && response?.data?.paid) {
			next();
			return next();
		}
		if (stepHighlight === 'payment') {
			if (response?.data?.redirect_url) {
				return window.location.href = response.data.redirect_url;
			}
			if (!response?.data?.paid) {
				return;
			}
		}
		if (stepHighlight === 'sign') {
			setSessionId('');
			setFormData({});
			setSelectedProducts([]);
			setCurrentStepIndex(0);
			return window.location.href = response.data.redirect_url;
		}
		if (!isLastStep) return next();

	};

	return (
		<div className="w-full max-w-[900px] ">
			<div className="lg:hidden">
				<FormProgressBar className="justify-center" />
			</div>
			<FormContext.Provider value={{ formSession, setFormSession }}>
				<Form {...form}>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="space-y-8 py-4"
					>
						{step}
						<div className="flex flex-col justify-end gap-4">

							<Button
								variant={'green'}
								size={'lg'}
								type="submit"
								className="w-full flex justify-between items-center"
							>
								<span className="uppercase">
									{isLastStep ? 'Finish & Exist Form' : 'Next'}
								</span>
								<ArrowRight
									size="24"
									className="text-secondary-foreground"
								/>
							</Button>
						</div>
					</form>
				</Form>
				<div className="hidden lg:block">
					<FormProgressBar className="justify-end" />
				</div>
			</FormContext.Provider>
		</div>
	);
};

export default FormPage;
