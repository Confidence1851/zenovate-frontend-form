"use client";

import { useFormStore } from "@/stores/formStore";
import React from "react";

const OrderSummary = () => {
  const selectedProducts = useFormStore((state) => state.selectedProducts);
  const totalPrice = useFormStore((state) => state.totalPrice);

  return (
    <div className="space-y-10">
      {/* List of items */}
      <div className="flex flex-col gap-4">
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
        {/* Sub total */}
        <div>
          <div className="flex justify-between">
            <h3 className="uppercase text-lg md:text-2xl font-semibold">
              Subtotal
            </h3>
            <p className="text-lg font-semibold">{totalPrice.toFixed(2)}</p>
          </div>
          <div className="w-full h-[1px] bg-Gray-100" />
        </div>

        {/* Shipping */}
        <div>
          <div className="flex justify-between">
            <h3 className="uppercase text-lg md:text-2xl font-semibold">
              shipping
            </h3>
            <p className="text-lg font-semibold">$ 100</p>
          </div>
          <div className="w-full h-[1px] bg-Gray-100" />
        </div>

        {/* Total */}
        <div className="flex justify-between">
          <h3 className="uppercase text-2xl md:text-4xl font-semibold">
            Total
          </h3>
          <p className="text-lg md:text-2xl font-semibold">
            $ {(totalPrice + 100).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
