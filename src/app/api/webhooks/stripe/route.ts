import Stripe from "stripe";
import { NextResponse, NextRequest } from "next/server";
import { headers } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const body = await req.text(); // Capture the raw body as text

  const sig = headers().get("Stripe-Signature") as string; // Capture the Stripe signature

  const payloadString = JSON.stringify(body, null, 2);
  const secret = process.env.STRIPE_WEBHOOK_SECRET!;
  const header = stripe.webhooks.generateTestHeaderString({
    payload: payloadString,
    secret,
  });

  let event;

  try {
    event = stripe.webhooks.constructEvent(payloadString, header, secret);

    // @ts-ignore
    const response = JSON.parse(event);
    console.log(`🔔  event data: `, response.data);
    console.log(`🔔  event type:`, response.type);
    console.log(`🔔  event received: `, event);
    console.log(`🔔  event type : `, typeof event);
    const session = response.data.object;
    console.log("session type:", session);

    const eventType = event.type;
    console.log("Event type:", eventType);
    // Process the event (e.g., handle payment events, etc.)

    return NextResponse.json({ message: "Webhook received" });
  } catch (err: any) {
    console.error(`❌ Webhook Error: ${err.message}`);

    // Respond with error status if webhook signature verification fails
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }
}

const sampleEvent = {
  id: "evt_1Q2xa5Rr7qvsAXrpZSDh7Aiv",
  object: "event",
  api_version: "2024-04-10",
  created: 1727279805,
  data: {
    object: {
      id: "cs_test_a1OXMGBhXBnv6MEvrseAZbZOZWfiJH2KeN7W67Skb1GMK6bK7m6Luxgaub",
      object: "checkout.session",
      after_expiration: null,
      allow_promotion_codes: null,
      amount_subtotal: 8998,
      amount_total: 8998,
      automatic_tax: {
        enabled: false,
        liability: null,
        status: null,
      },
      billing_address_collection: null,
      cancel_url: "http://localhost:3000",
      client_reference_id: null,
      client_secret: null,
      consent: null,
      consent_collection: null,
      created: 1727279787,
      currency: "usd",
      currency_conversion: null,
      custom_fields: [],
      custom_text: {
        after_submit: null,
        shipping_address: null,
        submit: null,
        terms_of_service_acceptance: null,
      },
      customer: null,
      customer_creation: "if_required",
      customer_details: {
        address: {
          city: null,
          country: "NG",
          line1: null,
          line2: null,
          postal_code: null,
          state: null,
        },
        email: "shabimoshood07@gmail.com",
        name: "Moshood Shabi",
        phone: null,
        tax_exempt: "none",
        tax_ids: [],
      },
      customer_email: null,
      expires_at: 1727366187,
      invoice: null,
      invoice_creation: {
        enabled: false,
        invoice_data: {
          account_tax_ids: null,
          custom_fields: null,
          description: null,
          footer: null,
          issuer: null,
          metadata: {},
          rendering_options: null,
        },
      },
      livemode: false,
      locale: null,
      metadata: {
        plan: "Monthly plan",
        buyerId: "shabimoshood07@gmail.com",
        sessionId: "dggikks_122*jjs122_233xbbss",
      },
      mode: "payment",
      payment_intent: "pi_3Q2xa4Rr7qvsAXrp1Q6uI3z7",
      payment_link: null,
      payment_method_collection: "if_required",
      payment_method_configuration_details: null,
      payment_method_options: {
        card: {
          request_three_d_secure: "automatic",
        },
      },
      payment_method_types: ["card"],
      payment_status: "paid",
      phone_number_collection: {
        enabled: false,
      },
      recovered_from: null,
      saved_payment_method_options: null,
      setup_intent: null,
      shipping_address_collection: null,
      shipping_cost: null,
      shipping_details: null,
      shipping_options: [],
      status: "complete",
      submit_type: null,
      subscription: null,
      success_url: "http://localhost:3000/dggikks_122*jjs122_233xbbss",
      total_details: {
        amount_discount: 0,
        amount_shipping: 0,
        amount_tax: 0,
      },
      ui_mode: "hosted",
      url: null,
    },
  },
  livemode: false,
  pending_webhooks: 3,
  request: {
    id: null,
    idempotency_key: null,
  },
  type: "checkout.session.completed",
};
