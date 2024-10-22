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
import { useFormStore } from '@/stores/formStore';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';

type FormSelectYesOrNoProps<TFormValues extends FieldValues = FieldValues> = {
	control: Control<TFormValues>;
	name: Path<TFormValues>;
	label?: string;
	placeholder?: string;
	errors?:
		| Partial<DeepMap<TFormValues, FieldError>>
		| FieldErrors<TFormValues>;
	className?: string;
} & Omit<InputProps, 'name'>;

const FormSelectYesOrNo = <TFormValues extends Record<string, unknown>>({
	control,
	label,
	name,
	errors,
}: FormSelectYesOrNoProps<TFormValues>): JSX.Element => {
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
							hasError ? 'error_tag' : 'text-Green-100'
						} form-label`}
					>
						{label}
					</p>
					<div className="relative">
						<FormControl>
							<div className="flex gap-10">
								{data.map((item) => (
									<div
										key={item.value}
										className="flex gap-2 items-center"
									>
										<Checkbox
											checked={field.value === item.value}
											onCheckedChange={(checked) => {
												if (checked) {
													field.onChange(item.value);
													updateFormData(
														name,
														item.value,
													);
												}
											}}
											className="h-6 w-6 border border-primary"
										/>
										<Label className="capitalize text-Green-300 text-base font-semibold">
											{item.label}
										</Label>
									</div>
								))}
							</div>
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

export default FormSelectYesOrNo;

const data = [
	{
		label: 'yes',
		value: 'yes',
	},
	{
		label: 'No',
		value: 'no',
	},
];

//  <Select
//    onValueChange={(value) => {
//      field.onChange(value.toLowerCase());
//      updateFormData(name, value);
//    }}
//    defaultValue={formData[name]}
//  >
//    <FormControl>
//      <SelectTrigger
//        className={cn(
//          ` ${
//            hasError
//              ? "focus-visible:ring-red-600 focus:ring-offset-2 focus:ring-2  focus:ring-red-600"
//              : "focus-visible:ring-dark_text focus:ring-offset-0 focus:ring-0 "
//          } form-input `
//        )}
//      >
//        <SelectValue
//          placeholder="Select an option"
//          className="uppercase placeholder:text-base placeholder:font-medium"
//        />
//      </SelectTrigger>
//    </FormControl>
//    <SelectContent className="bg-OffWhite-100">
//      {data.map((item, i) => (
//        <SelectItem
//          value={item.value}
//          key={i}
//          className="text-base font-medium uppercase"
//        >
//          <span className="capitalize">{item.label}</span>
//        </SelectItem>
//      ))}
//    </SelectContent>
//  </Select>;
