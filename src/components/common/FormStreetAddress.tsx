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
	UseFormSetValue,
} from 'react-hook-form';

import { FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import { useEffect, useRef } from 'react';
import { Input, InputProps } from '../ui/input';
import { useFormStore } from '@/stores/formStore';

//Google
import { useJsApiLoader, Autocomplete } from '@react-google-maps/api';

type FormStreetAddressProps<TFormValues extends FieldValues = FieldValues> = {
	control: Control<TFormValues>;
	name: Path<TFormValues>;
	label?: string;
	placeholder?: string;
	errors?:
		| Partial<DeepMap<TFormValues, FieldError>>
		| FieldErrors<TFormValues>;
	setValue: UseFormSetValue<FieldValues>;
} & Omit<InputProps, 'name'>;

const FormStreetAddress = <TFormValues extends Record<string, unknown>>({
	control,
	label,
	name,
	placeholder,
	errors,
	setValue,
}: FormStreetAddressProps<TFormValues>): JSX.Element => {
	const errorMessage = lodash.get(errors, name);
	const hasError = !!errors && errorMessage;
	const updateFormData = useFormStore((state) => state.updateFormData);
	const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(
		null,
	);
	const { isLoaded } = useJsApiLoader({
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
		libraries: ['places'],
	});

	const handlePlaceChange = () => {
		if (autocompleteRef.current) {
			const place = autocompleteRef.current.getPlace();
			if (place && place.address_components) {
				let streetAddress = '';
				let city = '';
				let stateProvince = '';
				let postalZipCode = '';
				let country = '';

				place.address_components.forEach((component) => {
					const types = component.types;

					if (types.includes('street_number')) {
						streetAddress += component.long_name + ' ';
					}
					if (types.includes('route')) {
						streetAddress += component.long_name;
					}
					if (types.includes('locality')) {
						city = component.long_name;
					}
					if (types.includes('administrative_area_level_1')) {
						stateProvince = component.long_name;
					}
					if (types.includes('postal_code')) {
						postalZipCode = component.long_name;
					}
					if (types.includes('country')) {
						country = component.long_name;
					}
				});

				const trimmedStreetAddress = streetAddress.split(',')[0];

				// Update form values
				// onChange(trimmedStreetAddress);
				// setValue("city", city);
				// setValue("stateProvince", stateProvince);
				// setValue("postalZipCode", postalZipCode);
				// setValue("country", country);

				// Update Zustand store
				updateFormData('streetAddress', trimmedStreetAddress);
				updateFormData('city', city);
				updateFormData('stateProvince', stateProvince);
				updateFormData('postalZipCode', postalZipCode);
				updateFormData('country', country);
				setValue('streetAddress', trimmedStreetAddress);
				// if (inputRef.current) {
				//   inputRef.current.value = "";
				//   inputRef.current.value = trimmedStreetAddress;
				// }
			}
		}
	};

	if (!isLoaded) {
		return <div>Loading address autocomplete...</div>;
	}

	// useEffect(() => {
	//   console.log(isLoaded, "isloaded");
	// }, [isLoaded]);

	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<Autocomplete
					onLoad={(autocomplete) => {
						autocompleteRef.current = autocomplete;
						autocomplete.setFields([
							'address_components',
							'formatted_address',
						]);
					}}
					onPlaceChanged={handlePlaceChange}
				>
					<FormItem>
						<p
							className={`${
								hasError ? 'error_tag' : 'text-Green-100'
							} form-label`}
						>
							{label}
						</p>
						<div className="relative ">
							<FormControl>
								{/* @ts-ignore */}
								<Input
									type="text"
									{...field}
									placeholder={placeholder}
									autoFocus={false}
									className="form-input"
								/>
							</FormControl>
						</div>
						{hasError && (
							<FormMessage className="error_tag">
								{errorMessage.message}
							</FormMessage>
						)}
					</FormItem>
				</Autocomplete>
			)}
		/>
	);
};

export default FormStreetAddress;
