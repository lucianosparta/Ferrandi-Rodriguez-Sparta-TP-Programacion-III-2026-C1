// Mostrar Toastify si hay mensaje en la URL
function mostrarMensajeToast() {
    const params = new URLSearchParams(window.location.search);
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

function logout() {
    localStorage.removeItem('adminUser');
    window.location.href = '../login/index.html';
}

document.addEventListener('DOMContentLoaded', () => {
    mostrarMensajeToast();
    mostrarSeccion("productos");
});