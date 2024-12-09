'use client';

import { updateSession } from '@/server-actions/api.actions';
import { useFormStore } from '@/stores/formStore';
import React, { useEffect, useState } from 'react';

const OrderSummary = () => {
	const sessionId = useFormStore((state) => state.sessionId);
	const [checkoutData, setCheckoutData] = useState<Checkout>();

	useEffect(() => {
		updateSession({
			sessionId: sessionId,
			step: 'checkout',
		}).then((r) => {
			setCheckoutData(r.data);
		});
	}, []);

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
									{prod.description}
								</p>
							</div>
							<p className="text-base md:text-lg font-semibold">
								${prod.price}
							</p>
						</div>
						<div className="w-full h-[1px] bg-Gray-100" />
					</div>
				))}
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
