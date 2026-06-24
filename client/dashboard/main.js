const adminLogueado = localStorage.getItem("adminLogueado");

if (!adminLogueado) {
    window.location.href = '../login/index.html';
}