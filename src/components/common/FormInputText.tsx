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
import { ReactNode, useState } from 'react';
import { Input, InputProps } from '../ui/input';
import { cn } from '@/lib/utils';
import { useFormStore } from '@/stores/formStore';
import { Eye, EyeSlash } from 'iconsax-react';
import { Button } from '../ui/button';

type FormInputTextProps<TFormValues extends FieldValues = FieldValues> = {
	control: Control<TFormValues>;
	name: Path<TFormValues>;
	label?: string;
	placeholder?: string;
	rightElement?: ReactNode;
	leftElement?: ReactNode;
	errors?:
	| Partial<DeepMap<TFormValues, FieldError>>
	| FieldErrors<TFormValues>;
	className?: string;
	updateLocalStorage?: boolean;
} & Omit<InputProps, 'name'>;

const FormInputText = <TFormValues extends Record<string, unknown>>({
	control,
	label,
	name,
	placeholder,
	rightElement,
	leftElement,
	errors,
	className,
	updateLocalStorage = true,
	...props
}: FormInputTextProps<TFormValues>): JSX.Element => {
	const errorMessage = lodash.get(errors, name);
	const hasError = !!errors && errorMessage;
	const [show, setShow] = useState(false);
	const updateFormData = useFormStore((state) => state.updateFormData);
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<p
						className={`${hasError ? 'error_tag' : 'text-Green-100'
							} form-label`}
					>
						{label}
					</p>
					<div className="relative ">
						{leftElement && (
							<div className="absolute top-0 w-10 bg-transparent flex items-center h-full px-4">
								{leftElement}
							</div>
						)}

						<FormControl className="border-4 border-red-700">
							<>
								{/* @ts-ignore */}
								<Input
									className={cn(
										`form-input placeholder:text-Gray-100
                 ${leftElement ? 'pl-12' : 'pl-[18px]'}  ${rightElement ? 'pr-12' : 'pr-[18px]'
										} ${hasError
											? 'focus-visible:ring-red-600'
											: 'focus-visible:ring-dark_text '
										} `,
										className,
									)}
									placeholder={placeholder}
									type={
										props?.type === 'password'
											? show
												? 'text'
												: 'password'
											: props?.type
									}
									{...field}
									onInput={(e) =>
										updateLocalStorage &&
										updateFormData(
											name,
											(e.target as HTMLInputElement)
												.value,
										)
									}
								/>
								{/* used to toggle show password if input is of type passowrd */}
								{(rightElement ||
									props.type === 'password') && (
										<div className="absolute rounded-r-lg top-0 flex items-center h-full pl-1 right-2 bg-transparent">
											{props.type === 'password' ? (
												<Button
													className="h-fit w-fit bg-transparent hover:bg-transparent p-0 shadow-none"
													type="button"
													onClick={() =>
														setShow((prev) => !prev)
													}
												>
													{!show ? (
														<Eye
															size="26"
															color="#162c15"
															variant="Bold"
														/>
													) : (
														<EyeSlash
															size="26"
															color="#162c15"
															variant="Bold"
														/>
													)}
												</Button>
											) : (
												rightElement
											)}
										</div>
									)}
							</>
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

export default FormInputText;
