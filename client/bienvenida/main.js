function enter() {
    const input = document.getElementById('client-name');
    const nameError = document.getElementById('name-error');
    const nombre = input.value.trim();

    input.classList.remove('error');
    nameError.classList.remove('d-none');
 
    if (!nombre) {
        input.style.borderColor = '#f87171';
        input.style.boxShadow = '0 0 0 3px rgb(230, 38, 38)';
        input.classList.add('error');
        nameError.textContent = 'El nombre es requerido.';
        nameError.classList.add('d-block');
        return;
    }

    localStorage.setItem('nombreUsuario', nombre);
    alert(`¡Bienvenido, ${nombre}! 🎮`);
  // Redirigir a la tienda:
  // window.location.href = 'tienda.html?nombre=' + encodeURIComponent(name);
};
 
document.getElementById('cliente-nombre').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') enter();
});
 