// Importa las funciones necesarias de Firebase Authentication y Firestore
import { auth, db } from './firebase_config.js';
import { signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js';
import { doc, getDoc, collection, onSnapshot } from 'https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js';

// Elemento donde se insertarán las donaciones
const donationsTableBody = document.getElementById('donations-table-body');

// Verificar el estado de autenticación al cargar la página
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("Usuario autenticado:", user);
    checkAdminPrivileges(user);
  } else {
    window.location.href = "../index.html";
  }
});

// 📌 Función para escuchar cambios en la colección "donations" en tiempo real
function loadDonations() {
  onSnapshot(collection(db, "donations"), (snapshot) => {
    donationsTableBody.innerHTML = "";

    snapshot.docs.forEach((doc) => { // 🔥 Corrección aquí
      const donation = doc.data();

      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${donation.name}</td>
        <td>${donation.email}</td>
        <td>S/ ${donation.amount}</td>
        <td>${donation.message || 'Sin mensaje'}</td>
        <td>${new Date(donation.date.seconds * 1000).toLocaleString()}</td>
      `;

      donationsTableBody.appendChild(row);
    });
  });
}

// Función para verificar si el usuario tiene privilegios de administrador
function checkAdminPrivileges(user) {
  const adminDocRef = doc(db, "admins", user.uid);

  getDoc(adminDocRef)
    .then((docSnapshot) => {
      if (docSnapshot.exists()) {
        console.log("¡Bienvenido al panel de administración!");
        loadDonations(); // Cargar donaciones en tiempo real
      } else {
        alert("No tienes permisos de administrador.");
        window.location.href = "../index.html";
      }
    })
    .catch((error) => {
      console.error("Error al verificar privilegios:", error);
      alert("Hubo un problema al verificar tus privilegios.");
    });
}

// Función para cerrar sesión
const logoutButton = document.getElementById("logout-button");
logoutButton.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      console.log("Usuario desconectado.");
      window.location.href = "../index.html";
    })
    .catch((error) => {
      console.error("Error al cerrar sesión:", error);
    });
});