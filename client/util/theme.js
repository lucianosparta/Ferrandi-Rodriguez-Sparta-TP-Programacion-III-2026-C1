const CLAVE_TEMA = "colorTema";
const TEMA_CLARO = "light";
const TEMA_OSCURO = "dark";

function inicializarTema() {
    const tema = localStorage.getItem(CLAVE_TEMA) || TEMA_CLARO;
    aplicarTema(tema);
}

function aplicarTema(tema) {
    document.documentElement.setAttribute("data-bs-theme", tema);
    localStorage.setItem(CLAVE_TEMA, tema);
}

function cambiarTema() {
    const temaActual = localStorage.getItem(CLAVE_TEMA) || TEMA_CLARO;
    const nuevoTema = temaActual === TEMA_CLARO ? TEMA_OSCURO : TEMA_CLARO;
    aplicarTema(nuevoTema);
}

inicializarTema();