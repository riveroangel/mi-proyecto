// === VARIABLES ===
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
let total = 0;

const botonesComprar = document.querySelectorAll('.btn-comprar');
const contadorCarrito = document.getElementById('carrito-contador');
const carritoModal = document.getElementById('carrito-modal');
const cerrarModalBtn = document.getElementById('cerrar-modal');
const carritoLista = document.getElementById('carrito-lista');
const carritoTotal = document.getElementById('carrito-total');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
const carritoImg = document.querySelector('.carrito');

// === EVENTOS ===

// Mostrar modal
if (carritoImg && carritoModal) {
  carritoImg.addEventListener('click', () => {
    carritoModal.style.display = 'block';
  });

  cerrarModalBtn?.addEventListener('click', () => {
    carritoModal.style.display = 'none';
  });

  carritoModal.addEventListener('click', (e) => {
    if (e.target === carritoModal) {
      carritoModal.style.display = 'none';
    }
  });
}

// Agregar productos
if (botonesComprar.length > 0) {
  botonesComprar.forEach((boton) => {
    boton.addEventListener('click', (e) => {
      e.preventDefault();

      const productoDiv = boton.closest('.productos');
      const nombre = productoDiv.querySelector('img').alt;
      const precioTexto = productoDiv.querySelector('.precio').textContent.replace('$', '').replace('.', '');
      const precio = parseInt(precioTexto, 10);

      carrito.push({ nombre, precio });
      guardarCarrito();
      actualizarCarrito();
      animarContador();
    });
  });
}

// Vaciar carrito
vaciarCarritoBtn?.addEventListener('click', () => {
  if (confirm('¿Estás seguro de que querés vaciar el carrito?')) {
    carrito = [];
    guardarCarrito();
    actualizarCarrito();
  }
});

// === FUNCIONES ===
function actualizarCarrito() {
  contadorCarrito.textContent = carrito.length;
  carritoLista.innerHTML = '';
  total = 0;

  if (carrito.length === 0) {
    const liVacio = document.createElement('li');
    liVacio.textContent = 'Tu carrito está vacío.';
    carritoLista.appendChild(liVacio);
  } else {
    carrito.forEach((item, idx) => {
      total += item.precio;

      const li = document.createElement('li');
      li.textContent = `${item.nombre} - $${item.precio}`;

      const btnEliminar = document.createElement('button');
      btnEliminar.textContent = 'Eliminar';
      btnEliminar.style.marginLeft = '10px';
      btnEliminar.onclick = () => {
        carrito.splice(idx, 1);
        guardarCarrito();
        actualizarCarrito();
      };

      li.appendChild(btnEliminar);
      carritoLista.appendChild(li);
    });
  }

  carritoTotal.textContent = total;
}

function guardarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

function animarContador() {
  contadorCarrito.style.transition = 'background-color 0.3s';
  const originalColor = contadorCarrito.style.backgroundColor;
  contadorCarrito.style.backgroundColor = '#4caf50';
  setTimeout(() => {
    contadorCarrito.style.backgroundColor = originalColor || '#b7d700';
  }, 600);
}

// Inicializar
actualizarCarrito();
