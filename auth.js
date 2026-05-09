if (!window.mySupabaseClient) {
  const supabaseUrl = "https://arewzgemzqmokinlylhu.supabase.co";
  const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFyZXd6Z2VtenFtb2tpbmx5bGh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyMzgyNzQsImV4cCI6MjA5MzgxNDI3NH0.vBh00PCILcjrcGynLto-5Ce7zfRvjTXMUDqzG1PWGMw";

  window.mySupabaseClient = window.supabase.createClient(
    supabaseUrl,
    supabaseKey
  );
}

const db = window.mySupabaseClient;

document.getElementById("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const firstName = e.target.firstName.value;
  const lastName = e.target.lastName.value;
  const email = e.target.email.value;

  // 1️⃣ Inscription Supabase
  const { error } = await db
    .from("users")
    .insert([
      {
        first_name: firstName,
        last_name: lastName,
        email: email
      }
    ]);

  if (error) {
    console.log(error);
    alert("Erreur inscription Supabase");
    return;
  }

  // 2️⃣ Stripe checkout
  try {
    const response = await fetch(
      "https://harmonia-woad.vercel.app/api/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          priceId: "price_1TUn0AF9c1lWA0HyP8ZwVeBN",
          email,
          firstName,
          lastName
        })
      }
    );

    const data = await response.json();
    console.log(data);

    if (!data.url) {
      alert("Erreur Stripe");
      return;
    }

    window.location.href = data.url;

  } catch (err) {
    console.log(err);
    alert("Erreur connexion Stripe");
  }
});
