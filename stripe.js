const stripe = Stripe("pk_live_51Q034cF9c1lWA0Hy7EnayZDKTYJUiKnm0vPcOy8mkUGDmq1OjBennoOi7ZKVSmPekJXpvkzB7hZ9Kuwfq4haMEYS004gwlFkJu");

async function subscribe() {
  const response = await fetch("/create-checkout-session", {
    method: "POST"
  });

  const session = await response.json();

  stripe.redirectToCheckout({
    sessionId: session.id
  });
}
