const URL_API = "http://localhost:3000/productos";

let productosArray = [];
let categoriaActual = "consolas";
let paginaActual = 1;
const PRODUCTOS_POR_PAGINA = 4;

function renderizarProductos(productos) {
    const contenedor = document.getElementById("contenedor-productos");
    contenedor.innerHTML = ""; 

    if (productos.length === 0) {
        contenedor.innerHTML = `<p class="text-center text-muted">No hay productos disponibles.</p>`;
        return;
    }

    productos.forEach((producto) => {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("col");

        const imagenSrc = producto.imagen || "../images/logo.png";

        tarjeta.innerHTML = `
          <div class="card h-100 shadow-sm">
            <div class="bg-light d-flex align-items-center justify-content-center py-4">
              <img src="${imagenSrc}" class="card-img-top w-50" alt="${producto.nombre}" />
            </div>
            <div class="card-body d-flex flex-column">
              <p class="text-uppercase text-muted small mb-1 fw-semibold">${producto.categoria}</p>
              <h5 class="card-title fw-bold">${producto.nombre}</h5>
              <p class="card-text text-secondary small flex-grow-1">
                ${producto.descripcion ?? ""}
              </p>
              <h4 class="fw-bold my-3 text-dark">$${producto.precio}</h4>
              <p class="small text-muted mb-2">Stock: ${producto.stock}</p>
              <div class="mt-auto">
                <button class="btn btn-primary btn-sm w-100 fw-bold btn-add">AÑADIR</button>
              </div>
            </div>
          </div>
        `;
        tarjeta.querySelector(".btn-add").addEventListener("click", () => {
            agregarAlCarrito(producto);
        });
        contenedor.appendChild(tarjeta);
    });
}

function renderizarPaginacion(totalFiltrados) {
    const totalPaginas = Math.ceil(totalFiltrados / PRODUCTOS_POR_PAGINA) || 1;

    document.getElementById("texto-pagina").textContent = `Página ${paginaActual} de ${totalPaginas}`;

    document.getElementById("btn-anterior").disabled = paginaActual === 1;
    document.getElementById("btn-siguiente").disabled = paginaActual === totalPaginas;
}

function actualizarVista() {
    const filtrados = productosArray.filter((producto) => producto.categoria === categoriaActual);
    const inicio = (paginaActual - 1) * PRODUCTOS_POR_PAGINA;
    const fin = inicio + PRODUCTOS_POR_PAGINA;
    const productosPagina = filtrados.slice(inicio, fin);

    renderizarProductos(productosPagina);
    renderizarPaginacion(filtrados.length);
}

function agregarAlCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const existente = carrito.find(p => Number(p.id) === Number(producto.id));

    if (existente) {
        existente.cantidad += 1;
    } else {
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: 1
        });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarContadorCarrito();
}

function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const total = carrito.reduce((acc, producto) => acc + producto.cantidad, 0);

    const badge = document.getElementById("cart-count");

    if (badge) {
        badge.textContent = total;
    }
}
const tablas = document.querySelectorAll("#tablas-categoria .nav-link");

tablas.forEach((tab) => {
    tab.addEventListener("click", (evento) => {
        evento.preventDefault();

        tablas.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");

        categoriaActual = tab.dataset.categoria;
        paginaActual = 1;
        actualizarVista()
    });
});

async function obtenerProductos() {
    try {
        const respuesta = await fetch(URL_API);

        if (!respuesta.ok) {
            throw new Error("Error al traer los productos");
        }

        const productos = await respuesta.json();
        productosArray = productos;
        actualizarVista();

    } catch (error) {
        console.error(error);
    }
}

document.getElementById("btn-anterior").addEventListener("click", () => {
    if (paginaActual > 1) {
        paginaActual--;
        actualizarVista();
    }
});

document.getElementById("btn-siguiente").addEventListener("click", () => {
    paginaActual++;
    actualizarVista();
});

document.addEventListener("DOMContentLoaded", () => {
    actualizarContadorCarrito();
    obtenerProductos();
});