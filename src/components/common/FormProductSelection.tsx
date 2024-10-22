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

import { FormField, FormItem, FormMessage } from '../ui/form';
import { useEffect } from 'react';
import { InputProps } from '../ui/input';
import { useFormStore } from '@/stores/formStore';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';

type FormProductSelectionProps<TFormValues extends FieldValues = FieldValues> =
	{
		control: Control<TFormValues>;
		name: Path<TFormValues>;
		label?: string;
		placeholder?: string;
		errors?:
			| Partial<DeepMap<TFormValues, FieldError>>
			| FieldErrors<TFormValues>;
		className?: string;
		setValue: UseFormSetValue<FieldValues>;
	} & Omit<InputProps, 'name'>;

const FormProductSelection = <TFormValues extends Record<string, unknown>>({
	control,
	name,
	errors,
	setValue,
}: FormProductSelectionProps<TFormValues>): JSX.Element => {
	const errorMessage = lodash.get(errors, name);
	const hasError = !!errors && errorMessage;
	const selectedProducts = useFormStore((state) => state.selectedProducts);
	const updateSelectedProducts = useFormStore(
		(state) => state.updateSelectedProducts,
	);

	const handleSelect = (product: Product) => {
		updateSelectedProducts(product);
	};

	useEffect(() => {
		setValue('selectedProducts', selectedProducts);
	}, [selectedProducts]);

	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<div className="relative flex min-w-0 flex-grow gap-8 overflow-x-scroll py-8 custom-scrollbar items-stretch justify-stretch">
						{data.map((item) => (
							<div
								className=" gap-4 h-80 w-[300px] p-8 flex flex-col justify-between border border-Black-100 flex-shrink-0"
								key={item.name}
							>
								<div className="space-y-10">
									<div>
										<h3 className="text-lg font-semibold text-Black-100 uppercase">
											{item.name}
										</h3>
										<h4 className="text-base text-Gray-100 uppercase">
											{item.description}
										</h4>
									</div>
									<p className="text-base text-Gray-100">
										{item.content}
									</p>
								</div>

								<div className="flex justify-between items-center">
									<Button
										type="button"
										variant={'green'}
										className={`${
											selectedProducts.some(
												(selectedItem) =>
													selectedItem.name.toLowerCase() ===
													item.name.toLowerCase(),
											)
												? ''
												: 'bg-transparent border border-Black-100 text-my_dark'
										}    flex justify-between items-center uppercase  h-11`}
										onClick={() => {
											handleSelect(item);
											selectedProducts.includes(item)
												? field.onChange(
														selectedProducts.filter(
															(prod) =>
																prod.name !==
																item.name.toLowerCase(),
														),
													)
												: field.onChange([
														...selectedProducts,
														item,
													]);
										}}
									>
										<span>
											{selectedProducts.some(
												(selectedItem) =>
													selectedItem.name.toLowerCase() ===
													item.name.toLowerCase(),
											)
												? 'Selected'
												: 'Select'}
										</span>
										<ArrowRight size={16} />
									</Button>

									<span className="text-base font-semibold text-Green-100">
										$ {item.price}
									</span>
								</div>
							</div>
						))}
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

export default FormProductSelection;

const data = [
	{
		name: 'tripleDefense',
		description: 'Enhanced defense system',
		content: 'Optimized protection through a triple-component strategy.',
		items: ['Calcium', 'Magnesium', 'Glucosamine'],
		price: 39.99,
	},
	{
		name: 'shapeup',
		description: 'Fitness and health conditioning',
		content:
			'A holistic approach to improving physical fitness and overall well-being.',
		items: [
			'Personalized Workout Plans',
			'Nutritional Guidance',
			'Progress Tracking',
		],
		price: 49.99,
	},
	{
		name: 'phoslim',
		description: 'Metabolic & weight management',
		content:
			'Designed to support a healthy metabolism and assist in weight control.',
		price: 34.99,
	},
	{
		name: 'methylB12',
		description: 'Brain & nerve function',
		content:
			'Vitamin B12 in its most bioavailable form to support neurological health.',
		price: 29.99,
	},
	{
		name: 'nadCreation',
		description: 'Boosts cellular energy and repair',
		content: 'Critical for energy metabolism and cellular health.',
		price: 44.99,
	},
	{
		name: 'biotinLixer',
		description: 'Biotin to strengthen hair & skin',
		content:
			'A rich blend of biotin to strengthen and beautify hair, skin, and nails.',
		price: 24.99,
	},
	{
		name: 'glutathione',
		description:
			'Powerful antioxidant for detoxification and immune support',
		content: 'Supports detox processes and enhances antioxidant defenses.',
		price: 54.99,
	},
	{
		name: 'vitaminD3',
		description: 'Essential for bone health and immune function',
		content:
			'Critical for maintaining bone density and supporting immune system health.',
		price: 19.99,
	},
];
