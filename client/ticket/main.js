// REFERENCIAS DEL DOM
// REFERENCIAS DEL DOM
const btnDescargar = document.getElementById("btn-descargar");
const btnSalir = document.getElementById("btn-salir");
const contenedorProductos = document.getElementById("contenedor-productos");
const totalTicket = document.getElementById("total-ticket");
const nombreCliente = document.getElementById("nombre-cliente");
const fechaTicket = document.getElementById("fecha-ticket");
const horaTicket = document.getElementById("hora-ticket");

// FUNCIONES DE LÓGICA Y RENDERIZADO
function cargarUsuario() {
    const usuarioGuardado = localStorage.getItem("nombreUsuario");
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

    fechaTicket.textContent = fechaCompra.toLocaleDateString("es-AR", formatoFecha);
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

// EVENTOS
document.addEventListener("DOMContentLoaded", inicializarTicket);

btnDescargar.addEventListener("click", async () => {
    const { jsPDF } = window.jspdf;
    const ticket = document.getElementById("ticket");
    const ticket = document.getElementById("ticket");

    btnDescargar.style.display = "none";
    btnSalir.style.display = "none";

    const canvas = await html2canvas(ticket, {
        scale: 2,
        backgroundColor: "#ffffff",
    });
    
    const imgData = canvas.toDataURL("image/png");
    const canvas = await html2canvas(ticket, {
        scale: 2,
        backgroundColor: "#ffffff",
    });
    
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [canvas.width / 2, canvas.height / 2],
        orientation: "portrait",
        unit: "px",
        format: [canvas.width / 2, canvas.height / 2],
    });

    pdf.addImage(imgData, "PNG", 0, 0, canvas.width / 2, canvas.height / 2);
    pdf.addImage(imgData, "PNG", 0, 0, canvas.width / 2, canvas.height / 2);
    pdf.save(`ticket-${Date.now()}.pdf`);

    btnDescargar.style.display = "block";
    btnSalir.style.display = "block";
});

// Limpieza de memoria al salir
btnSalir.addEventListener("click", () => {
    localStorage.removeItem("carrito");
    localStorage.removeItem("fechaCompra");
});

// Limpieza de memoria al salir
btnSalir.addEventListener("click", () => {
    localStorage.removeItem("carrito");
    localStorage.removeItem("fechaCompra");
});