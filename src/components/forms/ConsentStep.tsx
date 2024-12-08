'use client';
// @ts-ignore
import * as lodash from 'lodash';
import {
	Control,
	DeepMap,
	FieldError,
	FieldErrors,
	FieldValues,
} from 'react-hook-form';
import FormWrapper from './FormWrapper';
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form';

type ConsentStepFormProps<TFormValues extends FieldValues = FieldValues> = {
	control: Control<TFormValues>;
	errors:
	| Partial<DeepMap<TFormValues, FieldError>>
	| FieldErrors<TFormValues>;
};
import { useFormStore } from '@/stores/formStore';
import { Checkbox } from '../ui/checkbox';
import { useEffect } from 'react';

const ConsentStep = ({ control, errors }: ConsentStepFormProps) => {
	const updateFormData = useFormStore((state) => state.updateFormData);
	const error1 = lodash.get(errors, 'consentAgreement');
	const error2 = lodash.get(errors, 'consentSharing');
	const hasError1 = !!errors && error1;
	const hasError2 = !!errors && error2;
	const updateStepHighlight = useFormStore(
		(state) => state.updateStepHighlight,
	);

	useEffect(() => {
		updateStepHighlight('sign');
	}, []);

	function handleFinish() {

	}

	return (
		<div className="space-y-20">
			{/* <div>
				<h2 className="text-center md:text-4xl text-2xl font-semibold text-Gray-100 uppercase">
					order summary
				</h2>
				<OrderSummary />
			</div> */}

			<div>
				<FormWrapper formTitle="Consent and Agreement">
					<div className="flex flex-col gap-10">
						<p className="text-justify text-base">
							To ensure the best experience and comply with healthcare regulations, we kindly ask you to
							review and agree to our <a href="/legal/terms-of-service" className="text-Blue-500 underline">Terms of Service</a> and
							<a href="/legal/privacy-policy" className="text-Blue-500 underline">Privacy Policy</a>. Your privacy and safety are our top priorities.
							By consenting, you authorize us to collect and process your personal and medical information to provide
							healthcare services, including prescription medications, treatment recommendations, and relevant medical updates.
							You acknowledge that all information provided will be reviewed by licensed healthcare providers and pharmacists
							to determine appropriate treatment options.
						</p>

						<FormField
							control={control}
							name="consentAgreement"
							render={({ field }) => (
								<FormItem className="">
									<FormControl>
										<div className=" flex gap-2">
											<Checkbox
												checked={field.value}
												onCheckedChange={(checked) => {
													field.onChange(checked);
													updateFormData(
														'consentAgreement',
														checked,
													);
												}}
												className="h-6 w-6 border border-primary"
												style={{ marginTop: "7px" }}
											/>
											<FormLabel className="text-base uppercase text-Green-300 max-w-[600px] font-semibold">
												By checking this box, I certify that:
												<br />
												All information I have provided is true, complete, and accurate. I authorize Zenovate and its affiliated healthcare providers, pharmacies, and partner companies
												in the United States and Canada to act as my healthcare providers and pharmacists. I consent to telehealth services and understand that if prescribed, my prescription will be
												sent electronically to a licensed pharmacy. I have reviewed and agree to the Terms of Service and Privacy Policy. I understand that providing false or misleading information may result in denial of service and/or legal consequences.
											</FormLabel>
										</div>
									</FormControl>

									{hasError1 && (
										<FormMessage className="error_tag">
											{error1.message}
										</FormMessage>
									)}
								</FormItem>
							)}
						/>
						<FormField
							control={control}
							name="consentSharing"
							render={({ field }) => (
								<FormItem className="">
									<FormControl>
										<div className=" flex gap-2">
											<Checkbox
												checked={field.value}
												onCheckedChange={(checked) => {
													field.onChange(checked);
													updateFormData(
														'consentSharing',
														checked,
													);
												}}
												className="h-6 w-6 border border-primary"
												style={{ marginTop: "7px" }}
											/>
											<FormLabel className="text-base uppercase text-Green-300 max-w-[600px] font-semibold">
												I agree that my information be shared with
												<a href="#" className='mx-1' target="_blank" rel="noopener noreferrer">SkyCare</a>, Zenovate`s Medical Partner.
											</FormLabel>
										</div>
									</FormControl>

									{hasError2 && (
										<FormMessage className="error_tag">
											{error2.message}
										</FormMessage>
									)}
								</FormItem>
							)}
						/>
					</div>
				</FormWrapper>
			</div>
		</div>
	);
};

export default ConsentStep;
