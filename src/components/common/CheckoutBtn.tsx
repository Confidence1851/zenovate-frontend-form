"use client";

import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ArrowRight } from "iconsax-react";

const CheckoutBtn = () => {
  const [_, setStripePromise] = useState<Promise<any> | null>(null);
  useEffect(() => {
    setStripePromise(loadStripe(process.env.NEXT_PUBLIC_PUBLISHABLE_KEY!));
  }, []);

  return (
    <section>
      <Button
        role="link"
        type="submit"
        className="w-full bg-Black-100 text-White-100 h-10 flex justify-between items-center p-4 hover:bg-Black-100"
      >
        <span className="uppercase">Checkout </span>
        <ArrowRight size="32" className="text-secondary-foreground" />
      </Button>
    </section>
  );
};

export default CheckoutBtn;
