import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export const config = { api: { bodyParser: false } };

async function getRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", chunk => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const sig = req.headers["stripe-signature"];
  const rawBody = await getRawBody(req);

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature error:", err.message);
    return res.status(400).json({ error: "Webhook error: " + err.message });
  }

  console.log("Stripe event:", event.type);

  switch (event.type) {

    case "checkout.session.completed": {
      const session = event.data.object;
      const email = session.customer_email || session.metadata?.email;
      const customerId = session.customer;

      if (email) {
        const { error } = await supabase
          .from("users")
          .update({
            subscribed: true,
            subscribed_at: new Date().toISOString(),
            stripe_customer_id: customerId
          })
          .eq("email", email);

        if (error) console.error("Supabase update error (checkout):", error);
        else console.log("User subscribed:", email);
      }
      break;
    }

    case "customer.subscription.updated": {
      const sub = event.data.object;
      const customerId = sub.customer;
      const isActive = ["active", "trialing"].includes(sub.status);

      const { error } = await supabase
        .from("users")
        .update({ subscribed: isActive })
        .eq("stripe_customer_id", customerId);

      if (error) console.error("Supabase update error (sub update):", error);
      else console.log("Subscription updated:", customerId, "active:", isActive);
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object;
      const customerId = subscription.customer;

      const { error } = await supabase
        .from("users")
        .update({ subscribed: false })
        .eq("stripe_customer_id", customerId);

      if (error) console.error("Supabase unsubscribe error:", error);
      else console.log("User unsubscribed:", customerId);
      break;
    }

    case "invoice.payment_failed": {
      const invoice = event.data.object;
      const customerId = invoice.customer;
      const attemptCount = invoice.attempt_count;

      // Après 3 échecs, désactiver l'abonnement
      if (attemptCount >= 3) {
        const { error } = await supabase
          .from("users")
          .update({ subscribed: false })
          .eq("stripe_customer_id", customerId);

        if (error) console.error("Supabase payment failed error:", error);
        else console.log("Subscription deactivated after payment failure:", customerId);
      } else {
        console.log("Payment failed (attempt", attemptCount, "):", customerId);
      }
      break;
    }

    default:
      console.log("Unhandled event type:", event.type);
  }

  return res.status(200).json({ received: true });
}
