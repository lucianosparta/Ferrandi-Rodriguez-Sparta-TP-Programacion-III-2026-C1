    const emailInput = document.getElementById('adminEmail');
    const passInput  = document.getElementById('adminPass');
    const emailError = document.getElementById('emailError');
    const passError  = document.getElementById('passError');


function login() {
    const email = emailInput.value.trim();
    const pass  = passInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let valid = true;

    emailInput.classList.remove('error');
    passInput.classList.remove('error');
    emailError.classList.remove('d-none');
    passError.classList.remove('d-none');

    if (!email) {
        emailInput.classList.add('error');
        emailError.textContent = 'El email es requerido.';
        emailError.classList.add('d-block');
        valid = false;
    } else if (!emailRegex.test(email)) {
        emailInput.classList.add('error');
        emailError.textContent = 'El email no es válido.';
        emailError.classList.add('d-block');
        valid = false; 
    }

    if (!pass) {
        passInput.classList.add('error');
        passError.textContent = 'La contraseña es requerida.';
        passError.classList.add('d-block');
        valid = false;
    }

    if (!valid) return;

  // Acá va la lógica de autenticación
    window.location.href = '../dashboard/index.html';
}
   
document.getElementById("acceso").addEventListener("click", () => {
    emailInput.value = "admin@frsgaming.com";
    passInput.value = "1234root";
})
    


document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('adminPass').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') login();
     });
});