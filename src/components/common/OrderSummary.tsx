'use client';

import { updateSession } from '@/server-actions/api.actions';
import { useFormStore } from '@/stores/formStore';
import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const OrderSummary = () => {
	const sessionId = useFormStore((state) => state.sessionId);
	const [checkoutData, setCheckoutData] = useState<Checkout>();
	const [discountCode, setDiscountCode] = useState<string>('');
	const [isApplyingDiscount, setIsApplyingDiscount] = useState(false);
	const [discountError, setDiscountError] = useState<string>('');

	const updateFormData = useFormStore((state) => state.updateFormData);
	const formData = useFormStore((state) => state.formData);

	const fetchCheckoutData = async (discountCodeParam?: string) => {
		const data: any = {
			sessionId: sessionId,
			step: 'checkout',
		};
		if (discountCodeParam) {
			data.discount_code = discountCodeParam;
			// Store discount code in formData so it's available when payment is initiated
			updateFormData('discount_code', discountCodeParam);
		}
		const response = await updateSession(data);
		if (response.success && response.data) {
			setCheckoutData(response.data);
			if (discountCodeParam && !response.data.discount_amount) {
				setDiscountError('Invalid or expired discount code');
				updateFormData('discount_code', ''); // Clear invalid code
			} else {
				setDiscountError('');
			}
		}
	};

	useEffect(() => {
		// Check if there's an existing discount code in formData
		const existingDiscountCode = formData?.discount_code;
		if (existingDiscountCode) {
			setDiscountCode(existingDiscountCode);
			fetchCheckoutData(existingDiscountCode);
		} else {
			fetchCheckoutData();
		}
	}, []);

	const handleApplyDiscount = async () => {
		if (!discountCode.trim()) {
			setDiscountError('Please enter a discount code');
			return;
		}
		setIsApplyingDiscount(true);
		setDiscountError('');
		await fetchCheckoutData(discountCode.trim().toUpperCase());
		setIsApplyingDiscount(false);
	};

	const handleRemoveDiscount = async () => {
		setDiscountCode('');
		setDiscountError('');
		updateFormData('discount_code', '');
		await fetchCheckoutData(); // Fetch without discount code
	};

	return (
		<div className="space-y-10">
			<div className="flex flex-col gap-4">
				{checkoutData?.products && checkoutData?.products?.map((prod , i) => (
					<div key={i}>
						<div className="flex justify-between items-start">
							<div className="flex flex-col gap-2">
								<h3 className="uppercase font-medium text-base md:text-lg">
									{prod.name}
								</h3>
								<p className="text-Gray-100 text-sm md:text-base">
									{prod.nav_description}
								</p>
							</div>
							<p className="text-base md:text-lg font-semibold">
								${prod.price[0].value}
							</p>
						</div>
						<div className="w-full h-[1px] bg-Gray-100" />
					</div>
				))}
			</div>

			{/* Discount Code Section */}
			<div className="space-y-4">
				<div className="flex gap-2">
					<Input
						type="text"
						placeholder="Enter discount code"
						value={discountCode}
						onChange={(e) => {
							setDiscountCode(e.target.value.toUpperCase());
							setDiscountError('');
						}}
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								handleApplyDiscount();
							}
						}}
						className="flex-1"
						disabled={!!checkoutData?.discount_code}
					/>
					{checkoutData?.discount_code && checkoutData?.discount_amount ? (
						<Button
							type="button"
							onClick={handleRemoveDiscount}
							className="bg-red-500 text-White-100 hover:bg-red-600 px-6"
						>
							Remove
						</Button>
					) : (
						<Button
							type="button"
							onClick={handleApplyDiscount}
							disabled={isApplyingDiscount || !discountCode.trim()}
							className="bg-Black-100 text-White-100 hover:bg-Black-100 px-6"
						>
							{isApplyingDiscount ? 'Applying...' : 'Apply'}
						</Button>
					)}
				</div>
				{discountError && (
					<p className="text-red-500 text-sm">{discountError}</p>
				)}
				{checkoutData?.discount_code && checkoutData?.discount_amount && (
					<div className="flex items-center gap-2 text-Green-100">
						<span className="text-sm">Discount code applied: {checkoutData.discount_code}</span>
					</div>
				)}
			</div>

			<div className="space-y-10">
				{/* Sub total */}
				<div>
					<div className="flex justify-between">
						<h3 className="uppercase text-lg md:text-2xl font-semibold">
							Subtotal
						</h3>
						<p className="text-lg font-semibold">
							${checkoutData?.sub_total}
						</p>
					</div>
					<div className="w-full h-[1px] bg-Gray-100" />
				</div>

				{/* Discount */}
				{checkoutData?.discount_amount && checkoutData.discount_amount > 0 && (
					<div>
						<div className="flex justify-between">
							<h3 className="uppercase text-lg md:text-2xl font-semibold text-Green-100">
								Discount ({checkoutData.discount_code})
							</h3>
							<p className="text-lg font-semibold text-Green-100">
								-${checkoutData.discount_amount}
							</p>
						</div>
						<div className="w-full h-[1px] bg-Gray-100" />
					</div>
				)}

				{/* Shipping */}
				<div>
					<div className="flex justify-between">
						<h3 className="uppercase text-lg md:text-2xl font-semibold">
							Shipping
						</h3>
						<p className="text-lg font-semibold">
							${checkoutData?.shipping_fee}
						</p>
					</div>
					<div className="w-full h-[1px] bg-Gray-100" />
				</div>

				{/* Total */}
				<div className="flex justify-between">
					<h3 className="uppercase text-2xl md:text-4xl font-semibold">
						Total
					</h3>
					<p className="text-lg md:text-2xl font-semibold">
						${checkoutData?.total}
					</p>
				</div>
			</div>
		</div>
	);
};

export default OrderSummary;
