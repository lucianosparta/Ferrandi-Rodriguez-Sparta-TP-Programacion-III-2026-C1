const CLAVE_CARRITO = "carrito";

const tablaCarrito = document.getElementById("tabla-carrito");
const btnPago = document.getElementById("btn-pago");
const mensajeVacio = document.getElementById("mensaje-vacio");
const contenedorTabla = document.getElementById("contenedor-tabla");
const totalElemento = document.getElementById("total");
const modalElemento = document.getElementById("modalConfirmar");
const modal = new bootstrap.Modal(modalElemento);
const confirmarCompra = document.getElementById("confirmarCompra");

function obtenerCarrito() {
  const carritoGuardado = localStorage.getItem(CLAVE_CARRITO);
  return carritoGuardado ? JSON.parse(carritoGuardado) : [];
}

function guardarCarrito(carrito) {
  localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
}

function renderizarCarrito() {
  const carrito = obtenerCarrito();
  tablaCarrito.innerHTML = "";

  if (carrito.length === 0) {
    mensajeVacio.classList.remove("d-none");
    contenedorTabla.classList.add("d-none");
    btnPago.disabled = true;
    totalElemento.textContent = "$0.00";
    return;
  }

  mensajeVacio.classList.add("d-none");
  contenedorTabla.classList.remove("d-none");
  btnPago.disabled = false;

  let total = 0;

  carrito.forEach((producto) => {
    const subtotal = producto.precio * producto.cantidad;
    total += subtotal;

    const fila = document.createElement("tr");

    fila.innerHTML = `
      <td>${producto.nombre}</td>
      <td>$${producto.precio.toFixed(2)}</td>
      <td>
        <div class="d-flex align-items-center gap-2">
          <button class="btn btn-outline-secondary minus" data-id="${producto.id}">-</button>
          <input class="form-control text-center" value="${producto.cantidad}" readonly style="width:60px;">
          <button class="btn btn-outline-secondary plus" data-id="${producto.id}">+</button>
        </div>
      </td>
      <td class="fw-bold">$${subtotal.toFixed(2)}</td>
      <td>
        <button class="btn btn-purple eliminar" data-id="${producto.id}">
            <span class="material-symbols-outlined eliminar">delete</span>
        </button>
      </td>
    `;

    tablaCarrito.appendChild(fila);
  });

  totalElemento.textContent = "$" + total.toFixed(2);
}

function aumentarCantidad(id) {
  const carrito = obtenerCarrito();
  const producto = carrito.find((p) => p.id === id);

  if (producto) {
    producto.cantidad += 1;
    guardarCarrito(carrito);
    renderizarCarrito();
  }
}

function disminuirCantidad(id) {
  const carrito = obtenerCarrito();
  const producto = carrito.find((p) => p.id === id);

  if (producto && producto.cantidad > 1) {
    producto.cantidad -= 1;
    guardarCarrito(carrito);
    renderizarCarrito();
  }
}

function eliminarProducto(id) {
  const carritoNuevo = obtenerCarrito().filter((p) => p.id !== id);
  guardarCarrito(carritoNuevo);
  renderizarCarrito();
}

tablaCarrito.addEventListener("click", (e) => {
  const id = Number(e.target.dataset.id);

  if (e.target.classList.contains("plus")) {
    aumentarCantidad(id);
  }

  if (e.target.classList.contains("minus")) {
    disminuirCantidad(id);
  }

  if (e.target.classList.contains("eliminar")) {
    eliminarProducto(id);
  }
});

btnPago.addEventListener("click", () => {
  modal.show();
});

confirmarCompra.addEventListener("click", async () => {
  const carrito = obtenerCarrito();

  const nombreCliente = localStorage.getItem("nombreUsuario") || "Cliente";
  try {
    const respuesta = await fetch(
      "http://localhost:3000/ventas/registro-venta",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre_cliente: nombreCliente,
          productos: carrito,
        }),
      },
    );

    if (!respuesta.ok) {
      const errorData = await respuesta.json();
      throw new Error(errorData.error || "Error al procesar la compra");
    }

    modal.hide();
    window.location.href = "../ticket/ticket.html";
  } catch (error) {
    modal.hide();
    
    Toastify({
      text: error.message,
      duration: 3000,
      gravity: "top", 
      position: "right",
      backgroundColor: "#dc3545",
    }).showToast();
  }
});

renderizarCarrito();
