const CLAVE_CARRITO = "carrito";

const tablaCarrito = document.getElementById("tabla-carrito");
const btnPago = document.getElementById("btn-pago");
const mensajeVacio = document.getElementById("mensaje-vacio");
const contenedorTabla = document.getElementById("contenedor-tabla");
const totalElemento = document.getElementById("total");

//en consola y ejecutarlo
localStorage.setItem("carrito", JSON.stringify([
  {
    id: 1,
    nombre: "Nemesis Lockdown",
    precio: 57.99,
    cantidad: 1
  },
  {
    id: 2,
    nombre: "Nemesis Retaliation",
    precio: 189.95,
    cantidad: 1
  }
]));

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
    btnPago.classList.remove("btn-purple");
    btnPago.classList.add("btn-secondary");
    totalElemento.textContent = "$0.00";
    return;
  }

  mensajeVacio.classList.add("d-none");
  contenedorTabla.classList.remove("d-none");
  btnPago.disabled = false;
  btnPago.classList.remove("btn-secondary");
  btnPago.classList.add("btn-purple");

  let total = 0;

  carrito.forEach(producto => {
    const subtotal = producto.precio * producto.cantidad;
    total += subtotal;

    const fila = document.createElement("tr");

    fila.innerHTML = `
      <td>${producto.nombre}</td>
      <td>$${producto.precio.toFixed(2)}</td>
      <td>
        <div class="d-flex align-items-center gap-2">
          <button class="btn btn-outline-secondary minus" data-id="${producto.id}">-</button>
          <input
            type="text"
            class="form-control text-center quantity"
            value="${producto.cantidad}"
            readonly
            style="width: 60px;"
          >
          <button class="btn btn-outline-secondary plus" data-id="${producto.id}">+</button>
        </div>
      </td>
      <td class="fw-bold">$${subtotal.toFixed(2)}</td>
      <td>
        <button class="btn-icon-delete eliminar" data-id="${producto.id}">🗑</button>
      </td>
    `;

    tablaCarrito.appendChild(fila);
  });

  totalElemento.textContent = "$" + total.toFixed(2);
}

function aumentarCantidad(id) {
  const carrito = obtenerCarrito();
  const producto = carrito.find(p => p.id === id);

  if (producto) {
    producto.cantidad += 1;
    guardarCarrito(carrito);
    renderizarCarrito();
  }
}

function disminuirCantidad(id) {
  const carrito = obtenerCarrito();
  const producto = carrito.find(p => p.id === id);

  if (producto && producto.cantidad > 1) {
    producto.cantidad -= 1;
    guardarCarrito(carrito);
    renderizarCarrito();
  }
}

function eliminarProducto(id) {
  const carritoNuevo = obtenerCarrito().filter(p => p.id !== id);
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

renderizarCarrito();