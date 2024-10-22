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
import OrderSummary from '../common/OrderSummary';

const ConsentStep = ({ control, errors }: ConsentStepFormProps) => {
	const updateFormData = useFormStore((state) => state.updateFormData);
	const errorMessage = lodash.get(errors, 'consentAgreement');
	const hasError = !!errors && errorMessage;
	const updateStepHighlight = useFormStore(
		(state) => state.updateStepHighlight,
	);

	useEffect(() => {
		updateStepHighlight('sign');
	}, []);

	return (
		<div className="space-y-20">
			<div>
				<h2 className="text-center md:text-4xl text-2xl font-semibold text-Gray-100 uppercase">
					order summary
				</h2>
				<OrderSummary />
			</div>

			<div>
				<FormWrapper formTitle="Consent and Agreement">
					<div className="flex flex-col gap-10">
						<p className="text-justify text-base">
							To ensure the best experience, we kindly ask you to
							review and agree to our Terms of Service and Privacy
							Policy. Your privacy is important to us, and we are
							committed to handling your personal information
							responsibly. By consenting, you allow us to collect
							and use your data to provide our services, including
							updates about medical products and personalized
							recommendations. Please take the time to review the
							full details of how we protect your information. By
							continuing, you confirm your agreement with our
							policies.
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
											/>
											<FormLabel className="text-base uppercase text-Green-300 max-w-[600px] font-semibold">
												I certify that the information
												provided is true and accurate. I
												agree to the terms and
												conditions.
											</FormLabel>
										</div>
									</FormControl>

									{hasError && (
										<FormMessage className="error_tag">
											{errorMessage.message}
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
