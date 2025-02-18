// Importar las funciones necesarias de Firebase
import { getFirestore, collection, addDoc } from 'https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js';

// Obtener los elementos del formulario
const donateForm = document.getElementById('donate-form');
const donationAmountSelect = document.getElementById('donation-amount');
const customAmountContainer = document.getElementById('custom-amount-container');

// Inicializar Firestore
const db = getFirestore();

// Función para manejar el cambio en el select del monto de donación
donationAmountSelect.addEventListener('change', () => {
  if (donationAmountSelect.value === 'other') {
    customAmountContainer.style.display = 'block'; // Mostrar el campo de monto personalizado
  } else {
    customAmountContainer.style.display = 'none'; // Ocultar el campo de monto personalizado
  }
});

// Función para manejar el envío del formulario
donateForm.addEventListener('submit', async (e) => {
  e.preventDefault(); // Evitar que el formulario se envíe de manera predeterminada

  // Obtener los valores del formulario
  const name = document.getElementById('name').value;
  const email = document.getElementById('donation-email').value;
  const amount = donationAmountSelect.value === 'other' 
                  ? document.getElementById('other-amount').value // Si es "Otro", tomar el monto personalizado
                  : donationAmountSelect.value; // Si no, tomar el valor del select
  const message = document.getElementById('message').value;

  try {
    // Subir los datos a Firestore
    await addDoc(collection(db, 'donations'), {
      name: name,
      email: email,
      amount: amount,
      message: message,
      date: new Date(),
    });

    // Mostrar el popup de éxito
    alert('¡Gracias por tu donación! Ha sido procesada exitosamente.');

    // Limpiar el formulario
    donateForm.reset();
    customAmountContainer.style.display = 'none'; // Ocultar el campo de monto personalizado
  } catch (error) {
    console.error('Error al realizar la donación:', error);
    alert('Hubo un error al procesar tu donación. Por favor, inténtalo nuevamente.');
  }
});
