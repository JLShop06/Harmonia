// ============================================================
// auth.js — Configuration Supabase centralisée + logique signup
// ============================================================

// Init Supabase (une seule fois, partagé entre toutes les pages)
if (!window._supabase) {
    const SUPABASE_URL = "https://arewzgemzqmokinlylhu.supabase.co";
    const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFyZXd6Z2VtenFtb2tpbmx5bGh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyMzgyNzQsImV4cCI6MjA5MzgxNDI3NH0.vBh00PCILcjrcGynLto-5Ce7zfRvjTXMUDqzG1PWGMw";
    window._supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

const db = window._supabase;

// ============================================================
// SIGNUP — Gestion du formulaire d'inscription
// S'exécute uniquement si le formulaire existe sur la page
// ============================================================
const signupForm = document.getElementById("signupForm");

if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
          e.preventDefault();

                                    const firstName = e.target.firstName.value.trim();
          const lastName  = e.target.lastName.value.trim();
          const email     = e.target.email.value.trim();

                                    const submitBtn = signupForm.querySelector("button[type=submit]");
          submitBtn.disabled = true;
          submitBtn.textContent = "Envoi en cours...";

                                    // 1. Envoyer le magic link Supabase
                                    //    On stocke prénom/nom dans metadata pour les récupérer au callback
                                    const { error: otpError } = await db.auth.signInWithOtp({
                                            email,
                                            options: {
                                                      emailRedirectTo: "https://harmonia-woad.vercel.app/auth-callback.html",
                                                      data: {
                                                                  first_name: firstName,
                                                                  last_name:  lastName
                                                      }
                                            }
                                    });

                                    if (otpError) {
                                            alert("Erreur : " + otpError.message);
                                            submitBtn.disabled = false;
                                            submitBtn.textContent = "Commencer";
                                            return;
                                    }

                                    // 2. Stocker les infos localement pour les utiliser au callback
                                    localStorage.setItem("signup_first_name", firstName);
          localStorage.setItem("signup_last_name",  lastName);
          localStorage.setItem("signup_email",       email);
          localStorage.setItem("signup_pending_stripe", "true");

                                    // 3. Afficher confirmation
                                    signupForm.innerHTML = `
                                          <div style="text-align:center;padding:20px;">
                                                  <p style="font-size:1.1em;margin-bottom:10px;">✉️ Un lien magique t'a été envoyé à <strong>${email}</strong></p>
                                                          <p style="opacity:0.7;font-size:0.9em;">Clique sur le lien dans l'email pour accéder à Harmonia et finaliser ton abonnement.</p>
                                                                </div>
                                                                    `;
    });
}
