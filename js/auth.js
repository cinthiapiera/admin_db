// Importamos Firebase Auth y Firestore
import { auth, db } from "./firebase_config.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";

function showLoginAlert(message, type = "danger") {
    const alertDiv = document.getElementById("login-alert");
    if (!alertDiv) return;

    alertDiv.textContent = message;
    alertDiv.className = `alert alert-${type} text-center`;
    alertDiv.classList.remove("d-none");

    // Ocultar alerta después de 4 segundos
    setTimeout(() => {
        alertDiv.classList.add("d-none");
    }, 4000);
}

// Referencia al formulario de login
const loginForm = document.getElementById("login-admin-form");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    if (!email || !password) {
        showLoginAlert("Por favor, ingrese ambos campos.", "warning");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Verificar privilegios del administrador
      const adminRef = doc(db, "admins", user.uid);
      const adminSnap = await getDoc(adminRef);

      if (adminSnap.exists()) {
        showLoginAlert("¡Acceso concedido! Redirigiendo...", "success");
        setTimeout(() => {
          window.location.href = "admin-dashboard.html";
        }, 2000);
      } else {
        showLoginAlert("No tienes permisos de administrador.", "danger");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
      showLoginAlert("Credenciales incorrectas. Verifica tu correo y contraseña.", "danger");
    }
  });
}