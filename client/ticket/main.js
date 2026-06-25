// REFERENCIAS
const btnDescargar = document.getElementById("btn-descargar");
const btnSalir = document.getElementById("btn-salir");
const contenedorProductos = document.getElementById("contenedor-productos");
const totalTicket = document.getElementById("total-ticket");
const nombreCliente = document.getElementById("nombre-cliente");
const fechaTicket = document.getElementById("fecha-ticket");
const horaTicket = document.getElementById("hora-ticket");

// FUNCIONES
function cargarUsuario() {
  const usuarioGuardado = localStorage.getItem("nombreUsuario");
  nombreCliente.textContent = usuarioGuardado;
}

function congelarFechaYHora() {
  let fechaCompraIso = localStorage.getItem("fechaCompra");
  let fechaCompra;

  if (fechaCompraIso) {
    fechaCompra = new Date(fechaCompraIso);
  } else {
    fechaCompra = new Date();
    localStorage.setItem("fechaCompra", fechaCompra.toISOString());
  }

  const formatoFecha = { year: "numeric", month: "2-digit", day: "2-digit" };
  const formatoHora = { hour: "2-digit", minute: "2-digit" };

  fechaTicket.textContent = fechaCompra.toLocaleDateString(
    "es-AR",
    formatoFecha,
  );
  horaTicket.textContent = fechaCompra.toLocaleTimeString("es-AR", formatoHora);
}

function renderizarProductosCarrito() {
  const carritoGuardado = localStorage.getItem("carrito");
  const carrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];

  let total = 0;
  contenedorProductos.innerHTML = "";

  carrito.forEach((producto) => {
    const subtotal = producto.precio * producto.cantidad;
    total += subtotal;

    contenedorProductos.innerHTML += `
            <div class="d-flex justify-content-between align-items-start mb-3">
              <div>
                <h6 class="fw-bold mb-0">${producto.nombre}</h6>
                <small class="text-muted text-uppercase">
                  ${producto.categoria} - x${producto.cantidad} - $${producto.precio.toFixed(2)}
                </small>
              </div>
              <span class="fw-bold text-dark">$${subtotal.toFixed(2)}</span>
            </div>
        `;
  });

  totalTicket.textContent = "$" + total.toFixed(2);
}

function inicializarTicket() {
  cargarUsuario();
  congelarFechaYHora();
  renderizarProductosCarrito();
}

function generarTicketPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: "mm", format: "a4" });

  const carritoGuardado = localStorage.getItem("carrito");
  const carrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];
  const cliente = nombreCliente.textContent;
  const fecha = fechaTicket.textContent;
  const hora = horaTicket.textContent;

  let y = 15;

  // ENCABEZADO
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("FRS GAMING", 105, y, { align: "center" });

  y += 6;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text("Comprobante de compra", 105, y, { align: "center" });

  y += 9;
  doc.setLineWidth(0.3);
  doc.line(14, y, 196, y);
  y += 8;

  // DATOS DEL CLIENTE Y FECHA
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Cliente:", 14, y);
  doc.setFont("helvetica", "normal");
  doc.text(cliente, 35, y);

  doc.setFont("helvetica", "bold");
  doc.text("Fecha:", 140, y);
  doc.setFont("helvetica", "normal");
  doc.text(fecha, 158, y);

  y += 6;
  doc.setFont("helvetica", "bold");
  doc.text("Hora:", 140, y);
  doc.setFont("helvetica", "normal");
  doc.text(hora, 158, y);

  y += 8;
  doc.line(14, y, 196, y);
  y += 8;

  // TABLA DE PRODUCTOS
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("Producto", 14, y);
  doc.text("Categoría", 90, y);
  doc.text("Cant.", 130, y);
  doc.text("Precio Unit.", 150, y);
  doc.text("Subtotal", 180, y);

  y += 2;
  doc.line(14, y, 196, y);
  y += 6;

  doc.setFont("helvetica", "normal");
  carrito.forEach((p) => {
    const subtotal = p.precio * p.cantidad;

    doc.text(p.nombre, 14, y);
    doc.text(p.categoria, 90, y);
    doc.text(String(p.cantidad), 130, y);
    doc.text(`$${p.precio.toFixed(2)}`, 150, y);
    doc.text(`$${subtotal.toFixed(2)}`, 180, y);

    y += 7;
  });

  y += 3;
  doc.line(14, y, 196, y);
  y += 10;

  // TOTAL
  const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("TOTAL:", 140, y);
  doc.text(`$${total.toFixed(2)}`, 196, y, { align: "right" });

  y += 15;
  doc.line(14, y, 196, y);
  y += 8;

  // PIE DE PÁGINA
  doc.setFont("helvetica", "italic");
  doc.setFontSize(10);
  doc.text("¡Gracias por tu compra!", 105, y, { align: "center" });

  // GUARDAR
  doc.save(`ticket_${cliente}_${fecha.replaceAll("/", "-")}.pdf`);
}

// EVENTOS
document.addEventListener("DOMContentLoaded", inicializarTicket);

btnDescargar.addEventListener("click", generarTicketPDF);

btnSalir.addEventListener("click", () => {
  localStorage.removeItem("carrito");
  localStorage.removeItem("fechaCompra");
});
