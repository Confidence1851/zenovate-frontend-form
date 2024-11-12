'use client';
import { useFormStore } from '@/stores/formStore';
import { TickCircle } from 'iconsax-react';
import React, { useEffect, useContext } from 'react';
import OrderSummary from '../common/OrderSummary';
import CheckMark from '../icons/checkmark';
import { FormContext } from "@/utils/contexts";

const PaymentStep = () => {
	const updateStepHighlight = useFormStore(
		(state) => state.updateStepHighlight,
	);
	const { formSession } = useContext(FormContext)!;

	useEffect(() => {
		updateStepHighlight('payment');
	}, []);
	return (
		<div className="flex flex-col gap-10 min-h-[500px] space-y-10">
			{/* heading */}
			<h1 className="title t-h1">Checkout</h1>
			{!(formSession?.payment?.success ?? false) ? (
				<>
					<OrderSummary />
				</>
			) : (
				<>
					<h3 className="title t-h3">Payment completed</h3>
					<div className="flex justify-center flex-col w-full items-center gap-10">
						<CheckMark className="w-32 h-32 text-Green-100" />
					</div>
				</>
			)}
		</div>
	);
};

export default PaymentStep;
