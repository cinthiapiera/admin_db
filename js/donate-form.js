// Importar las funciones necesarias de Firebase
import { getFirestore, collection, addDoc, Timestamp } from 'https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js';

// Obtener los elementos del formulario
const donateForm = document.getElementById('donate-form');
const donationAmountSelect = document.getElementById('donation-amount');
const customAmountContainer = document.getElementById('custom-amount-container');

// Inicializar Firestore
const db = getFirestore();

// Función para manejar el cambio en el select del monto de donación
donationAmountSelect.addEventListener('change', () => {
  customAmountContainer.style.display = donationAmountSelect.value === 'other' ? 'block' : 'none';
});

// Función para manejar el envío del formulario
donateForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Obtener los valores del formulario
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('donation-email').value.trim();
  let amount = donationAmountSelect.value;

  // Si el usuario elige "Otro", validar y obtener el monto personalizado
  if (amount === 'other') {
    const customAmount = parseFloat(document.getElementById('other-amount').value.trim());

    if (isNaN(customAmount) || customAmount <= 0) {
      alert('Por favor, ingresa un monto válido.');
      return;
    }

    amount = customAmount;
  }

  const message = document.getElementById('message').value.trim();

  try {
    // Subir los datos a Firestore
    await addDoc(collection(db, 'donations'), {
      name,
      email,
      amount: parseFloat(amount), // Asegurar que el monto sea numérico
      message: message || 'Sin mensaje', // Evitar valores vacíos
      date: Timestamp.now(), // Mejor sincronización de tiempo
    });

    // Mostrar mensaje de éxito
    const donationMessage = document.getElementById('donation-message');

    donationMessage.className = 'alert alert-success';
    donationMessage.textContent = '¡Gracias por tu donación! Ha sido procesada con éxito.';
    donationMessage.classList.remove('d-none');

    setTimeout(() => {
      donationMessage.classList.add('d-none');
    }, 5000); // Ocultar después de 5 segundos

    // Limpiar el formulario
    donateForm.reset();
    customAmountContainer.style.display = 'none'; 

  } catch (error) {
    console.error('Error al realizar la donación:', error.message);
    alert('Hubo un error al procesar tu donación. Inténtalo nuevamente.');
  }
});
