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
import { productList } from '@/server-actions/api.actions';
import { FormContext } from "@/utils/contexts";

type FormProductPriceSelectionProps<TFormValues extends FieldValues = FieldValues> =
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

const FormProductPriceSelection = <TFormValues extends Record<string, unknown>>({
	control,
	name,
	errors,
	setValue,
}: FormProductPriceSelectionProps<TFormValues>): JSX.Element => {
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
	const state = useFormStore((state) => state);

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

		let list: SelectedProduct[] = [];
		products.forEach((p) => {
			pre_selected.filter((selected: any) => {
				if (selected.product_id === p.id) {
					list.push(selected as SelectedProduct);
				}
				return false;
			});
		});

		setSelectedProducts(list);
		setField("selected_products", []);
	}, [products]);

	function isProductSelected(product: Product): boolean {
		return selectedProducts.some((selected: SelectedProduct) => 
			selected.product_id === product.id
		);
	}

	function isSelected(product: Product, price: ProductPrice): boolean {
		return selectedProducts.some((selected: SelectedProduct) => 
			selected.product_id === product.id && selected.price_id === price.id
		);
	}
	
	useEffect(() => {
		setValue('selectedProductPrices', selectedProducts);
	}, [state]);

	const handleSelect = (product: Product , price: ProductPrice) => {
		let item = {
			product_id: product.id,
			price_id: price.id
		} as SelectedProduct;
		updateSelectedProducts(item);
	};


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
						{products.map((item) => isProductSelected(item) ? (
							<div
								className=" gap-4 w-[300px] p-8 flex flex-col justify-between border border-Black-100 flex-shrink-0"
								key={item.name}
							>
								<div className="space-y-10">
									<div>
										<h3 className="text-lg font-semibold text-Black-100 uppercase">
											{item.name}
										</h3>
									</div>
									<div className="text-base text-Gray-100 h-100">
										{item.price.map((price) => (
											<div
												key={price.id}
												className={`${
													isSelected(item , price)
													? 'bg-Green-100 text-white'
													: 'bg-transparent border border-Black-100 text-my_dark'
													}  flex justify-between items-center border p-4 mb-2 rounded cursor-pointer uppercase  h-20`}
												onClick={() => {
													handleSelect(item , price);
												}}
											>
												<div>
													<h3 className="font-semibold">Title</h3>
													<p className="text-sm text-white-500">Subtitle</p>
												</div>
												<span className="text-sm font-medium">{price.currency}{price.value} / {price.unit.toUpperCase()}</span>
											</div>
										))}
									</div>
								</div>
							</div>
						) : <></>)}
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

export default FormProductPriceSelection;
