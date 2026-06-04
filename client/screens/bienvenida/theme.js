const CLAVE_TEMA = "colorTema";
const TEMA_CLARO = "light";
const TEMA_OSCURO = "dark";

function inicializarTema() {
    const temaGuardado = localStorage.getItem(CLAVE_TEMA);

    if (!temaGuardado) {
        localStorage.setItem(CLAVE_TEMA, TEMA_CLARO);
        aplicarTema(TEMA_CLARO);
    } else {
        aplicarTema(temaGuardado);
    }
}

const ELEMENTOS_TEMA = [
  { id: "main-bienvenida", light: "bg-gradiente-light", dark: "bg-gradiente" },
  { id: "card", light: "welcome-card-light", dark: "welcome-card" },
  { id: "h1-title", light: "text-black", dark: "text-white" },
];

function aplicarTema(tema) {
    document.documentElement.setAttribute("data-bs-theme", tema);

    ELEMENTOS_TEMA.forEach(({ id, light, dark }) => {
        const elemento = document.getElementById(id);
        if (!elemento) return;

        if (tema === "dark") {
            elemento.classList.replace(light, dark);
        } else {
            elemento.classList.replace(dark, light);
        }
    });
}

function cambiarTema() {
    const temaActual = localStorage.getItem(CLAVE_TEMA) || TEMA_CLARO;
    const nuevoTema = temaActual === TEMA_CLARO ? TEMA_OSCURO : TEMA_CLARO;

    localStorage.setItem(CLAVE_TEMA, nuevoTema);
    aplicarTema(nuevoTema);
}

inicializarTema();