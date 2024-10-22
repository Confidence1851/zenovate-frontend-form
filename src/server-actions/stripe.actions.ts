"use server";
import { redirect } from "next/navigation";
import Stripe from "stripe";

export async function checkout(transaction: CheckoutTransactionParams) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const amount = Number(transaction.amount) * 100; //amount is processed in cent

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: amount,
          product_data: {
            name: transaction.plan,
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      plan: transaction.plan,
      sessionId: transaction.sessionId,
      buyerId: transaction.buyerId,
    },
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/${transaction.sessionId}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}`,
  });

  redirect(session.url!);
}
