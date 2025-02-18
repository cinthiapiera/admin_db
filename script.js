// Importamos los servicios de Firebase
import { auth, db } from './firebase_config.js';
import { signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js';
import { doc, getDoc } from 'https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js'; // Importamos las funciones correctas para Firestore

// Elementos del formulario de inicio de sesión
const loginForm = document.getElementById("login-admin-form");

// Manejar el envío del formulario de login
loginForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  // Validación básica de campos
  if (!email || !password) {
    alert("Por favor, ingrese ambos campos.");
    return;
  }

  // Iniciar sesión con Firebase Authentication
  signInWithEmailPassword(email, password);
});

// Función para iniciar sesión con correo y contraseña
function signInWithEmailPassword(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      console.log("Usuario autenticado:", user);

      // Verificar si el usuario tiene privilegios de administrador
      await checkAdminPrivileges(user);
    })
    .catch((error) => {
      console.error("Error al iniciar sesión:", error.message);
      alert("Credenciales incorrectas. Verifica tu correo y contraseña.");
    });
}

// Función para verificar si el usuario tiene privilegios de administrador
async function checkAdminPrivileges(user) {
  try {
    // Obtenemos el documento del usuario en la colección "admins"
    const adminRef = doc(db, "admins", user.uid);
    const adminSnap = await getDoc(adminRef);

    if (adminSnap.exists()) {
      // El usuario tiene privilegios de administrador
      alert("¡Acceso concedido! Bienvenido al panel de administración.");
      window.location.href = "admin-dashboard.html"; // Redirigir a la página de administración
    } else {
      alert("No tienes permisos de administrador.");
    }
  } catch (error) {
    console.error("Error al verificar privilegios:", error.message);
    alert("Hubo un problema al verificar tus privilegios.");
  }
}
