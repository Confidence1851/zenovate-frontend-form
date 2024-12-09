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
import { useEffect, useState, useContext } from 'react';
import { InputProps } from '../ui/input';
import { useFormStore } from '@/stores/formStore';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';
import { productList } from '@/server-actions/api.actions';
import { FormContext } from "@/utils/contexts";

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
	const fields = useFormStore((state) => state.fields);
	const updateSelectedProducts = useFormStore(
		(state) => state.updateSelectedProducts,
	);
	const [products, setProducts] = useState<Product[]>([]);
	const { formSession } = useContext(FormContext)!;
	const setField = useFormStore.getState().setField;
	const setSelectedProducts = useFormStore.getState().setSelectedProducts;

	const handleSelect = (product: Product) => {
		updateSelectedProducts(product);
	};

	useEffect(() => {
		setValue('selectedProducts', selectedProducts);
	}, [selectedProducts]);

	useEffect(() => {
		function list() {
			productList().then((v) => {
				setProducts(v.data);
			});
		}
		list();
	}, []);


	useEffect(() => {
		const pre_selected = (fields?.selected_products ?? []);
		if (pre_selected.length == 0) return;
		if (products.length == 0) return;
		if ((formSession?.payment?.success ?? false)) {
			return;
		}
		let list: Product[] = []
		products.forEach((p) => {
			if (pre_selected.includes(p.id)) {
				list.push(p as Product);
			}
		});
		setSelectedProducts(list);
		setField("selected_products", []);
	}, [products]);


	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem>
					{(formSession?.payment?.attempts ?? 0) > 0 && formSession?.payment?.message ? (
						<div className={formSession?.payment?.success ? 'bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative' : 'bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'}>
							{formSession?.payment?.message}
						</div>
					) : <div className='pt-4'></div>}
					<div className="relative flex min-w-0 flex-grow gap-8 overflow-x-scroll py-8 mt-6 custom-scrollbar items-stretch justify-stretch">
						{products.map((item) => (
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
											{item.subtitle}
										</h4>
									</div>
									<p className="text-base text-Gray-100">
										{item.description}
									</p>
								</div>

								<div className="flex justify-between items-center">
									<Button
										disabled={(formSession?.payment?.success ?? true)}
										type="button"
										variant={'green'}
										className={`${selectedProducts.some(
											(selectedItem) =>
												selectedItem.name.toLowerCase() ===
												item.name.toLowerCase(),
										)
											? ''
											: 'bg-transparent border border-Black-100 text-my_dark'
											}    flex justify-between items-center uppercase  h-11`}
										onClick={() => {
											// If the use has already paid for this session, prevent them from changing selection
											if ((formSession?.payment?.success ?? true)) {
												return;
											}
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
