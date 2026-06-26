const params = new URLSearchParams(window.location.search);

function cargarLocalStorage() {
    const adminUser = params.get("adminUser");

    if (adminUser) {
        localStorage.setItem("adminUser", adminUser);
        window.history.replaceState({}, document.title, window.location.pathname);
    }

    const adminLogueado = localStorage.getItem("adminUser");

    if (!adminLogueado) {
        window.location.href = 'http://127.0.0.1:5500/client/login/index.html';
    }

}

// Mostrar Toastify si hay mensaje en la URL
function mostrarMensajeToast() {
    const mensaje = params.get('mensaje');
    const tipo = params.get('tipo');
    
    if (mensaje) {
        const backgroundColor = tipo === 'success' ? '#28a745' : '#dc3545';
        Toastify({
            text: decodeURIComponent(mensaje),
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: backgroundColor,
        }).showToast();

        // Limpiar la URL sin recargar
        window.history.replaceState({}, document.title, window.location.pathname);
    }


}

function mostrarSeccion(seccion) {
    const productos = document.getElementById("productos");
    const ventas = document.getElementById("ventas");
    const btnProductos = document.getElementById("btnProductos");
    const btnVentas = document.getElementById("btnVentas");

    if (seccion === "productos") {
        productos.style.display = "block";
        ventas.style.display = "none";
        btnProductos.classList.remove("btn-outline-secondary");
        btnProductos.classList.add("btn-purple");
        btnVentas.classList.remove("btn-purple");
        btnVentas.classList.add("btn-outline-secondary");
    } else {
        productos.style.display = "none";
        ventas.style.display = "block";
        btnVentas.classList.remove("btn-outline-secondary");
        btnVentas.classList.add("btn-purple");
        btnProductos.classList.remove("btn-purple");
        btnProductos.classList.add("btn-outline-secondary");
    }
}

function inicializarModalConfirmacion() {

    const modalElement = document.getElementById("modalConfirmar");
    
    if (!modalElement) return;

    const modal = new bootstrap.Modal(modalElement);

    const mensajeModal = document.getElementById("mensajeModal");
    const botonConfirmar = document.getElementById("confirmarAccion");

    let formularioActual = null;

    document.querySelectorAll(".abrirModal").forEach(boton => {

        boton.addEventListener("click", () => {
            formularioActual = boton.closest("form");
            mensajeModal.textContent = boton.dataset.mensaje;
            modal.show();
        });

    });

    botonConfirmar.addEventListener("click", () => {

        if (formularioActual) {
            formularioActual.submit();
        }

    });

}

function logout() {
    localStorage.removeItem("adminUser");
    window.location.href = "http://127.0.0.1:5500/client/login/index.html";
}

document.addEventListener('DOMContentLoaded', () => {
    cargarLocalStorage();
    mostrarMensajeToast();
    mostrarSeccion("productos");
    inicializarModalConfirmacion();
});