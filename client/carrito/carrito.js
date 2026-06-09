const plusButtons = document.querySelectorAll(".plus");

const minusButtons = document.querySelectorAll(".minus");

const eliminarButtons = document.querySelectorAll(".eliminar");

const btnPago = document.getElementById("btn-pago");

const mensajeVacio = document.getElementById("mensaje-vacio");

const contenedorTabla = document.getElementById("contenedor-tabla");

// ACTUALIZAR TOTALES

function actualizarTotales() {

  let total = 0;

  const productos =
    document.querySelectorAll(".producto");

  productos.forEach(producto => {

    const precio =
      parseFloat(
        producto.querySelector(".precio").textContent
      );

    const cantidad =
      parseInt(
        producto.querySelector(".quantity").value
      );

    const subtotal =
      precio * cantidad;

    producto.querySelector(".subtotal").textContent =
      "$" + subtotal.toFixed(2);

    total += subtotal;
  });

  document.getElementById("total").textContent =
    "$" + total.toFixed(2);

  // CARRITO VACÍO

  if (productos.length === 0) {

    mensajeVacio.classList.remove("d-none");
  
    contenedorTabla.classList.add("d-none");
  
    btnPago.disabled = true;
  
    btnPago.classList.remove("btn-primary");
  
    btnPago.classList.add("btn-secondary");
  
  } else {

    mensajeVacio.classList.add("d-none");

    contenedorTabla.classList.remove("d-none");;
  
    btnPago.disabled = false;
  
    btnPago.classList.remove("btn-secondary");
  
    btnPago.classList.add("btn-primary");
  }
}

// BOTON +

plusButtons.forEach(button => {

  button.addEventListener("click", () => {

    const input =
      button.parentElement.querySelector(".quantity");

    input.value++;
    actualizarTotales();
  });
});

// BOTON -

minusButtons.forEach(button => {

  button.addEventListener("click", () => {

    const input =
      button.parentElement.querySelector(".quantity");

    if (input.value > 1) {

      input.value--;

      actualizarTotales();

    }
  });
});

// ELIMINAR PRODUCTO

eliminarButtons.forEach(button => {

  button.addEventListener("click", () => {

    const fila =
      button.closest(".producto");

    fila.remove();

    actualizarTotales();

  });

});

// INICIALIZAR

actualizarTotales();