// ============================================================
// auth.js — Configuration Supabase centralisée + logique signup
// Chargé par toutes les pages via <script src="auth.js">
// ============================================================

(function() {
  "use strict";

  const SUPABASE_URL = "https://arewzgemzqmokinlylhu.supabase.co";
  const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFyZXd6Z2VtenFtb2tpbmx5bGh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyMzgyNzQsImV4cCI6MjA5MzgxNDI3NH0.vBh00PCILcjrcGynLto-5Ce7zfRvjTXMUDqzG1PWGMw";
  const REDIRECT_URL = "https://harmonia-woad.vercel.app/auth-callback.html";

  // Charge le SDK Supabase si pas encore chargé, puis initialise
  function initSupabase() {
    if (window._supabase) return;
    if (window.supabase) {
      window._supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
        auth: {
          autoRefreshToken: true,
          persistSession: true,
          detectSessionInUrl: true
        }
      });
      return;
    }
    // Charger le SDK dynamiquement si pas disponible
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
    script.onload = () => {
      window._supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
        auth: {
          autoRefreshToken: true,
          persistSession: true,
          detectSessionInUrl: true
        }
      });
      document.dispatchEvent(new Event("supabase:ready"));
    };
    script.onerror = () => console.error("[auth.js] Failed to load Supabase SDK");
    document.head.appendChild(script);
  }

  // Écouter quand le SDK est prêt
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSupabase);
  } else {
    initSupabase();
  }

  // ============================================================
  // SIGNUP — Gestion du formulaire d'inscription
  // ============================================================
  document.addEventListener("DOMContentLoaded", function() {
    const signupForm = document.getElementById("signupForm");
    if (!signupForm) return;

    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const firstName = (e.target.firstName?.value || "").trim();
      const lastName = (e.target.lastName?.value || "").trim();
      const email = (e.target.email?.value || "").trim();

      if (!email || !email.includes("@")) {
        alert("Veuillez entrer un email valide.");
        return;
      }

      const submitBtn = signupForm.querySelector("button[type=submit]");
      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = "Envoi en cours..."; }

      // Attendre que Supabase soit prêt
      const waitSb = () => new Promise(resolve => {
        if (window._supabase) return resolve(window._supabase);
        document.addEventListener("supabase:ready", () => resolve(window._supabase), { once: true });
        setTimeout(() => resolve(window._supabase), 5000);
      });

      const db = await waitSb();
      if (!db) {
        alert("Erreur de connexion. Veuillez réessayer.");
        if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = "Créer mon compte →"; }
        return;
      }

      const { error: otpError } = await db.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: REDIRECT_URL,
          data: { first_name: firstName, last_name: lastName }
        }
      });

      if (otpError) {
        let msg = "Erreur : " + otpError.message;
        if (otpError.message.includes("rate limit")) msg = "Trop d'essais. Attendez quelques minutes.";
        alert(msg);
        if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = "Créer mon compte →"; }
        return;
      }

      // Stocker les infos pour le callback
      localStorage.setItem("signup_first_name", firstName);
      localStorage.setItem("signup_last_name", lastName);
      localStorage.setItem("signup_email", email);
      localStorage.setItem("signup_pending_stripe", "true");

      // Afficher confirmation
      signupForm.innerHTML = `
        <div style="text-align:center;padding:20px;">
          <div style="font-size:2rem;margin-bottom:12px;">✉️</div>
          <p style="font-size:1.05em;margin-bottom:8px;">Lien envoyé à <strong>${email}</strong></p>
          <p style="opacity:.7;font-size:.88em;">Clique sur le lien dans l'email pour créer ton compte et finaliser l'abonnement.</p>
          <p style="margin-top:16px;font-size:.8em;opacity:.5;">Si tu ne trouves pas l'email, vérifie tes spams.</p>
        </div>
      `;
    });
  });

})();
