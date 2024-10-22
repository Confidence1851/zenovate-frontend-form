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
import { Textarea } from '../ui/textarea';

type FormTextAreaProps<TFormValues extends FieldValues = FieldValues> = {
	control: Control<TFormValues>;
	name: Path<TFormValues>;
	label?: string;
	placeholder?: string;
	errors?:
		| Partial<DeepMap<TFormValues, FieldError>>
		| FieldErrors<TFormValues>;
	className?: string;
	rows: number;
} & Omit<InputProps, 'name'>;

const FormTextArea = <TFormValues extends Record<string, unknown>>({
	control,
	label,
	name,
	placeholder,
	errors,
	className,
	rows,
}: FormTextAreaProps<TFormValues>): JSX.Element => {
	const errorMessage = lodash.get(errors, name);
	const hasError = !!errors && errorMessage;
	const updateFormData = useFormStore((state) => state.updateFormData);
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<p
						className={`${
							hasError ? 'error_tag' : 'text-my_dark'
						}  text-base font-medium capitalize`}
					>
						{label}
					</p>
					<div className="relative ">
						<FormControl>
							{/* @ts-ignore */}
							<Textarea
								placeholder={placeholder}
								rows={rows}
								className={cn(
									`form-input !h-max placeholder:text-Gray-100 placeholder:uppercase placeholder:text-base
                 ${
						hasError
							? 'focus-visible:ring-red-600'
							: 'focus-visible:ring-dark_text '
					} `,
									className,
								)}
								{...field}
								onInput={(e) =>
									updateFormData(
										name,
										(e.target as HTMLInputElement).value,
									)
								}
							/>
						</FormControl>
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

export default FormTextArea;
