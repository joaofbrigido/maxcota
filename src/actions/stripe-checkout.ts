"use server";

import apiError from "@/utils/apiError";
import { getStripeProduct } from "@/utils/stripe/stripeProducts";
import { createClient } from "@/utils/supabase/server";
import Stripe from "stripe";

export async function createCheckoutSession(productName: string) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  let userId;

  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return {
        ok: false,
        error: "Usuário não encontrado, tente novamente mais tarde.",
        data: null,
      };
    }

    userId = user.id;
  } catch (error) {
    return {
      ok: false,
      error: "Usuário não encontrado, tente novamente mais tarde.",
      data: null,
    };
  }

  try {
    const currentProduct = getStripeProduct(productName);
    const hasDiscount = currentProduct?.name === "pro" ? true : false;

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: currentProduct?.productPriceId,
          quantity: 1,
        },
      ],
      currency: "brl",
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success-payment`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/plans`,
      client_reference_id: userId,
      discounts: hasDiscount ? [{ coupon: process.env.STRIPE_COUPON_ID }] : [],
      metadata: { productName, userId },
    });

    return {
      ok: true,
      error: null,
      data: session.url,
    };
  } catch (error) {
    return apiError(error);
  }
}
