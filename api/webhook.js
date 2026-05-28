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

  // Gestion des events Stripe
  switch (event.type) {

    case "checkout.session.completed": {
      const session = event.data.object;
      const email      = session.customer_email || session.metadata?.email;
      const firstName  = session.metadata?.first_name || "";
      const lastName   = session.metadata?.last_name  || "";

      if (email) {
        // Marquer l'utilisateur comme abonné dans Supabase
        const { error } = await supabase
          .from("users")
          .update({
            subscribed:    true,
            subscribed_at: new Date().toISOString(),
            stripe_customer_id: session.customer
          })
          .eq("email", email);

        if (error) {
          console.error("Supabase update error:", error);
        } else {
          console.log("User subscribed:", email);
        }
      }
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
      break;
    }

    default:
      console.log("Unhandled event type:", event.type);
  }

  return res.status(200).json({ received: true });
}
