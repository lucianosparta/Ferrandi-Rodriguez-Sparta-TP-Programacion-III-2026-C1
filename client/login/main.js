    const emailInput = document.getElementById('adminEmail');
    const passInput  = document.getElementById('adminPass');
    const emailError = document.getElementById('emailError');
    const passError  = document.getElementById('passError');


async function login() {
    const email = emailInput.value.trim();
    const pass  = passInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let valid = true;

    emailInput.classList.remove('error');
    passInput.classList.remove('error');
    emailError.classList.add('d-none');
    passError.classList.add('d-none');

    if (!email) {
        emailInput.classList.add('error');
        emailError.textContent = 'El email es requerido.';
        emailError.classList.remove('d-none');
        valid = false;
    } else if (!emailRegex.test(email)) {
        emailInput.classList.add('error');
        emailError.textContent = 'El email no es válido.';
        emailError.classList.remove('d-none');
        valid = false; 
    }

    if (!pass) {
        passInput.classList.add('error');
        passError.textContent = 'La contraseña es requerida.';
        passError.classList.remove('d-none');
        valid = false;
    }

    if (!valid) return;

    try {
        const respuesta = await fetch("http://localhost:3000/usuarios/login", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({ email, password: pass}),
        });

        const data = await respuesta.json();

        if (!respuesta.ok) {   
            emailInput.classList.add('error');
            emailError.textContent = 'El email o la contraseña son inválidos';
            emailError.classList.remove('d-none');
        return;
        }

        window.location.href = `http://localhost:3000/admin/dashboard?adminUser=${encodeURIComponent(data.email)}`;

    } catch (error) {
        emailInput.classList.add('error');
        passInput.classList.add('error');
        emailError.textContent = 'Error al conectar con el servidor.';
        emailError.classList.remove('d-none');
        passError.classList.remove('d-none');
     }
}
   
document.getElementById("acceso").addEventListener("click", () => {
    emailInput.value = "email@frsgaming.com";
    passInput.value = "root1234";
})
    


document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('adminPass').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') login();
     });
});