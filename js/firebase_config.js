// Importar los módulos de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBqraQTVZwXAuW95uVuoMFn60I83aVTS-A",
  authDomain: "democonjuntos.firebaseapp.com",
  projectId: "democonjuntos",
  storageBucket: "democonjuntos.firebasestorage.app",
  messagingSenderId: "438391836686",
  appId: "1:438391836686:web:4ceae86bac8c1d19c3ac5f",
  measurementId: "G-WE3ERBTKZB"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar servicios de Firebase
const auth = getAuth(app);
const db = getFirestore(app);

console.log("Firebase app initialized", app);

// Exportar los objetos de autenticación y Firestore
export { auth, db };