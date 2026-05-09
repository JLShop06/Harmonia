// IMPORTANT : UNE SEULE déclaration
const supabaseUrl = "TON_URL_SUPABASE";
const supabaseKey = "TON_ANON_KEY";

const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);


// FORMULAIRE
document.getElementById("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const firstName = e.target.firstName.value;
  const lastName = e.target.lastName.value;
  const email = e.target.email.value;
  const address = e.target.address.value;

  // 1. Enregistrer dans Supabase
  const { data, error } = await supabase
    .from("users")
    .insert([
      {
        first_name: firstName,
        last_name: lastName,
        email: email,
        address: address
      }
    ]);

  if (error) {
    alert("Erreur inscription");
    console.log(error);
    return;
  }

  alert("Compte créé !");
});
