const stripe = Stripe("YOUR_PUBLIC_STRIPE_KEY");

async function subscribe() {
  const response = await fetch("/create-checkout-session", {
    method: "POST"
  });

  const session = await response.json();

  stripe.redirectToCheckout({
    sessionId: session.id
  });
}
