import Stripe from "stripe";
import { NextResponse, NextRequest } from "next/server";
import { update } from "@/actions/plan";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const payload = await req.text();
  const res = JSON.parse(payload);

  if (req.method !== "POST")
    return NextResponse.json({ status: "Failed: Method not allowed" });

  const sig = req.headers.get("Stripe-Signature");

  try {
    let event = stripe.webhooks.constructEvent(
      payload,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    if (event.type === "checkout.session.completed") {
      const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
        (event.data.object as any).id,
        { expand: ["line_items"] }
      );
      const lineItems = sessionWithLineItems.line_items;

      if (!lineItems)
        return NextResponse.json({ status: "Failed: No line items" });

      try {
        const plan = event.data.object.metadata?.productName as
          | "standard"
          | "pro";
        const userId = event.data.object.metadata?.userId as string;
        const responseUpdateUser = await update(plan, userId);

        if (!responseUpdateUser?.ok) {
          console.log("Error updating user: ", responseUpdateUser?.error);
        }
      } catch (error) {
        console.log("Error updating user: ", error);
      }
    }

    return NextResponse.json({
      status: "sucess",
      event: event.type,
      response: res,
    });
  } catch (error) {
    return NextResponse.json({ status: "Failed", error });
  }
}
