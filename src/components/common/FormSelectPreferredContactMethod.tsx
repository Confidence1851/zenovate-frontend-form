'use client';
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-ignore
import * as lodash from 'lodash';
import {
	Control,
	DeepMap,
	FieldError,
	FieldErrors,
	FieldValues,
	Path,
} from 'react-hook-form';

import { FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import { InputProps } from '../ui/input';
import { cn } from '@/lib/utils';
import { useFormStore } from '@/stores/formStore';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select';

type FormSelectPreferredContactMethodProps<
	TFormValues extends FieldValues = FieldValues,
> = {
	control: Control<TFormValues>;
	name: Path<TFormValues>;
	label?: string;
	errors?:
		| Partial<DeepMap<TFormValues, FieldError>>
		| FieldErrors<TFormValues>;
	className?: string;
} & Omit<InputProps, 'name'>;

const FormSelectPreferredContactMethod = <
	TFormValues extends Record<string, unknown>,
>({
	control,
	label,
	name,
	errors,
	className,
}: FormSelectPreferredContactMethodProps<TFormValues>): JSX.Element => {
	const errorMessage = lodash.get(errors, name);
	const hasError = !!errors && errorMessage;
	const updateFormData = useFormStore((state) => state.updateFormData);
	const formData = useFormStore((state) => state.formData);
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<p
						className={`${
							hasError ? 'error_tag' : 'text-primary'
						} form-label`}
					>
						{label}
					</p>
					<div className="relative">
						<Select
							onValueChange={(value) => {
								field.onChange(value);
								updateFormData('preferredContact', value);
							}}
							defaultValue={formData['preferredContact']}
						>
							<FormControl>
								<SelectTrigger
									className={cn(
										` ${
											hasError
												? 'focus-visible:ring-red-600 focus:ring-offset-2 focus:ring-2  focus:ring-red-600'
												: 'focus-visible:ring-dark_text focus:ring-offset-0 focus:ring-0 '
										} form-input `,
										className,
									)}
								>
									<SelectValue
										placeholder="Select method"
										className="uppercase placeholder:text-base placeholder:font-medium"
									/>
								</SelectTrigger>
							</FormControl>
							<SelectContent className="bg-OffWhite-100">
								{data.map((item, i) => (
									<SelectItem
										value={item.value}
										key={i}
										className="text-base font-medium uppercase"
									>
										<span className="capitalize">
											{item.label}
										</span>
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					{hasError && (
						<FormMessage className="error_tag">
							{errorMessage.message}
						</FormMessage>
					)}
				</FormItem>
			)}
		/>
	);
};

export default FormSelectPreferredContactMethod;

const data = [
	{
		label: 'email',
		value: 'email',
	},
	{
		label: 'phone',
		value: 'phone',
	},
];
