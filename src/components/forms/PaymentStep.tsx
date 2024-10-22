'use client';
import { useFormStore } from '@/stores/formStore';
import { TickCircle } from 'iconsax-react';
import React, { useEffect } from 'react';
import OrderSummary from '../common/OrderSummary';
import CheckMark from '../icons/checkmark';

const PaymentStep = () => {
	const selectedProducts = useFormStore((state) => state.selectedProducts);
	const totalPrice = useFormStore((state) => state.totalPrice);
	const paid = useFormStore((state) => state.paid);
	const updateStepHighlight = useFormStore(
		(state) => state.updateStepHighlight,
	);

	useEffect(() => {
		updateStepHighlight('payment');
	}, []);
	return (
		<div className="flex flex-col gap-10 min-h-[500px] space-y-10">
			{/* heading */}
			<h1 className="title t-h1">Checkout</h1>
			{!paid ? (
				<>
					{/* <div className="flex flex-col gap-4">
            {selectedProducts.map((prod) => (
              <>
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
                    $ {prod.price}
                  </p>
                </div>
                <div className="w-full h-[1px] bg-Gray-100" />
              </>
            ))}
          </div>

          <div className="space-y-10">
            <div>
              <div className="flex justify-between">
                <h3 className="uppercase text-lg md:text-2xl font-semibold">
                  Subtotal
                </h3>
                <p className="text-lg font-semibold">{totalPrice.toFixed(2)}</p>
              </div>
              <div className="w-full h-[1px] bg-Gray-100" />
            </div>

            <div>
              <div className="flex justify-between">
                <h3 className="uppercase text-lg md:text-2xl font-semibold">
                  shipping
                </h3>
                <p className="text-lg font-semibold">$ 100</p>
              </div>
              <div className="w-full h-[1px] bg-Gray-100" />
            </div>

            <div className="flex justify-between">
              <h3 className="uppercase text-2xl md:text-4xl font-semibold">
                Total
              </h3>
              <p className="text-lg md:text-2xl font-semibold">
                $ {(totalPrice + 100).toFixed(2)}
              </p>
            </div>
          </div> */}
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
