const CLAVE_TEMA = "colorTema";
const TEMA_CLARO = "light";
const TEMA_OSCURO = "dark";

const ELEMENTOS_TEMA = [
  { id: "main-dashboard", light: "bg-light", dark: "bg-dark" },
  { id: "h1-title", light: "text-black", dark: "text-white" }
];

function inicializarTema() {
    const temaGuardado = localStorage.getItem(CLAVE_TEMA);
    const tema = temaGuardado || TEMA_CLARO;

    if (!temaGuardado) {
        localStorage.setItem(CLAVE_TEMA, TEMA_CLARO);
    }

    document.documentElement.setAttribute("data-bs-theme", tema);

    document.addEventListener("DOMContentLoaded", () => aplicarClases(tema));
}

function aplicarClases(tema) {
    ELEMENTOS_TEMA.forEach(({ id, light, dark }) => {
        const elemento = document.getElementById(id);
        if (!elemento) return;

        if (tema === TEMA_OSCURO) {
            elemento.classList.remove(light);
            elemento.classList.add(dark);
        } else {
            elemento.classList.remove(dark);
            elemento.classList.add(light);
        }
    });
}

function aplicarTema(tema) {
    document.documentElement.setAttribute("data-bs-theme", tema);
    aplicarClases(tema);
}

function cambiarTema() {
    const temaActual = localStorage.getItem(CLAVE_TEMA) || TEMA_CLARO;
    const nuevoTema = temaActual === TEMA_CLARO ? TEMA_OSCURO : TEMA_CLARO;

    localStorage.setItem(CLAVE_TEMA, nuevoTema);
    aplicarTema(nuevoTema);
}

inicializarTema();