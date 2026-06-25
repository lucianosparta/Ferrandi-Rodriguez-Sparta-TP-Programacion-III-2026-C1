const formulario = document.getElementById("productoForm");
const esEdicion = formulario.dataset.edicion === "true";


// Validar formulario antes de enviar
function validarFormulario(e) {
    e.preventDefault();

    let valido = true;

    // Limpiar errores previos
    document.querySelectorAll('.invalid-feedback').forEach(el => el.textContent = '');
    document.querySelectorAll('.form-control, .form-select').forEach(el => el.classList.remove('is-invalid'));

    const nombre = document.getElementById('nombre').value.trim();
    const descripcion = document.getElementById('descripcion').value.trim();
    const categoria = document.getElementById('categoria').value;
    const precio = document.getElementById('precio').value;
    const stock = document.getElementById('stock').value;
    const imagen = document.getElementById('imagen').files[0];

    // Validar nombre
    if (!nombre) {
        document.getElementById('nombreError').textContent = 'El nombre no puede estar vacío';
        document.getElementById('nombre').classList.add('is-invalid');
        valido = false;
    } else if (nombre.length < 2) {
        document.getElementById('nombreError').textContent = 'El nombre debe tener al menos 2 caracteres';
        document.getElementById('nombre').classList.add('is-invalid');
        valido = false;
    }

    // Validar descripción
    if (!esEdicion && !descripcion) {
        document.getElementById('descripcionError').textContent = 'La descripción no puede estar vacía';
        document.getElementById('descripcion').classList.add('is-invalid');
        valido = false;
    } else if (descripcion && descripcion.length < 5) {
        document.getElementById('descripcionError').textContent = 'La descripción debe tener al menos 5 caracteres';
        document.getElementById('descripcion').classList.add('is-invalid');
        valido = false;
    }

    // Validar categoría
    if (!categoria) {
        document.getElementById('categoriaError').textContent = 'Debes seleccionar una categoría';
        document.getElementById('categoria').classList.add('is-invalid');
        valido = false;
    }

    // Validar precio
    if (!precio) {
        document.getElementById('precioError').textContent = 'El precio no puede estar vacío';
        document.getElementById('precio').classList.add('is-invalid');
        valido = false;
    } else if (parseFloat(precio) <= 0) {
        document.getElementById('precioError').textContent = 'El precio debe ser mayor a 0';
        document.getElementById('precio').classList.add('is-invalid');
        valido = false;
    }

    // Validar stock
    if (stock === '') {
        document.getElementById('stockError').textContent = 'El stock no puede estar vacío';
        document.getElementById('stock').classList.add('is-invalid');
        valido = false;
    } else if (parseInt(stock) < 0) {
        document.getElementById('stockError').textContent = 'El stock no puede ser negativo';
        document.getElementById('stock').classList.add('is-invalid');
        valido = false;
    }

    // Validar imagen
    if (!esEdicion && !imagen) {
        document.getElementById('imagenError').textContent = 'La imagen es requerida';
        document.getElementById('imagen').classList.add('is-invalid');
        valido = false;
    }

    if (imagen) {
        const tiposPermitidos = ['image/jpeg', 'image/jpg', 'image/png'];
        if (!tiposPermitidos.includes(imagen.type)) {
            document.getElementById('imagenError').textContent = 'Solo se permiten imágenes JPG, JPEG o PNG';
            document.getElementById('imagen').classList.add('is-invalid');
            valido = false;
        }

        // Validar tamaño (máx 5MB)
        const maxSize = 5 * 1024 * 1024;
        if (imagen.size > maxSize) {
            document.getElementById('imagenError').textContent = 'La imagen no puede superar 5MB';
            document.getElementById('imagen').classList.add('is-invalid');
            valido = false;
        }
    }

    if (valido) {
        formulario.submit();
    }
}

formulario.addEventListener('submit', validarFormulario);