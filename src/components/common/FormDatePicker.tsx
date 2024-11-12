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
import { Button } from '../ui/button';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Calendar } from '../ui/calendar';
type FormDatePickerProps<TFormValues extends FieldValues = FieldValues> = {
	control: Control<TFormValues>;
	name: Path<TFormValues>;
	label?: string;
	errors?:
	| Partial<DeepMap<TFormValues, FieldError>>
	| FieldErrors<TFormValues>;
	disableToday?: boolean;
} & Omit<InputProps, 'name'>;

const FormDatePicker = <TFormValues extends Record<string, unknown>>({
	control,
	label,
	name,
	errors,
	disableToday,
}: FormDatePickerProps<TFormValues>): JSX.Element => {
	const errorMessage = lodash.get(errors, name);
	const hasError = !!errors && errorMessage;
	const updateFormData = useFormStore((state) => state.updateFormData);
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className="flex flex-col">
					<p
						className={`${hasError ? 'error_tag' : 'text-Green-100'
							} form-label `}
					>
						{label}
					</p>
					<Popover>
						<PopoverTrigger asChild>
							<FormControl>
								<Button
									variant={'outline'}
									className={cn(
										'form-input !font-medium !uppercase !text-base',
										!field.value && 'text-muted-foreground',
									)}
								>
									{field.value ? (
										<span>
											{typeof field.value === 'string' ||
												typeof field.value === 'number' ||
												field.value instanceof Date
												? format(field.value, 'PPP')
												: 'Pick a date'}
										</span>
									) : (
										<span>Pick a date</span>
									)}
									<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
								</Button>
							</FormControl>
						</PopoverTrigger>
						<PopoverContent
							className="w-auto p-0 bg-OffWhite-100"
							align="start"
						>
							<Calendar
								mode="single"
								className="w-[300px]"
								selected={
									// field.value && (typeof field.value === 'string' || field.value instanceof Date)
									// 	? new Date(field.value)
									// 	: undefined
									// @ts-ignore
									field.value ? new Date(field.value) : undefined
								}
								onSelect={(value) => {
									if (value) {
										const dateValue = value instanceof Date ? value : new Date(value);
										field.onChange(dateValue);
										updateFormData(name, dateValue);
									} else {
										field.onChange(undefined);
										updateFormData(name, undefined);
									}
								}}
								disabled={
									disableToday &&
									((date) => {
										const today = new Date();
										const eighteenYearsAgo = new Date(
											today.getFullYear() - 18,
											today.getMonth(),
											today.getDate(),
										);

										return (
											date > today ||
											date < new Date('1900-01-01') ||
											date > eighteenYearsAgo || // Disable dates for people younger than 18
											date.toDateString() ===
											today.toDateString() // Disable today's date
										);
									})
								}
								initialFocus
								fromDate={new Date(1900, 1)}
								toDate={
									disableToday
										? new Date(
											new Date().getFullYear() - 18,
											new Date().getMonth(),
											new Date().getDate(),
										)
										: new Date()
								}
								captionLayout="dropdown-buttons"
								defaultMonth={
									field.value &&
										disableToday &&
										(typeof field.value === 'string' ||
											field.value instanceof Date)
										? new Date(field.value)
										: new Date(
											new Date().getFullYear() - 18,
											new Date().getMonth(),
											new Date().getDate(),
										)
								}
							/>
						</PopoverContent>
					</Popover>
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

export default FormDatePicker;
