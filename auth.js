// IMPORTANT : UNE SEULE déclaration
const supabaseUrl = "https://arewzgemzqmokinlylhu.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFyZXd6Z2VtenFtb2tpbmx5bGh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyMzgyNzQsImV4cCI6MjA5MzgxNDI3NH0.vBh00PCILcjrcGynLto-5Ce7zfRvjTXMUDqzG1PWGMw";

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
