const plusButtons = document.querySelectorAll(".plus");
const minusButtons = document.querySelectorAll(".minus");

function actualizarTotales() {

  let subtotal = 0;
  let cantidadProductos = 0;

  const productos = document.querySelectorAll(".cart-card");

  productos.forEach(producto => {

    const precio = parseFloat(
      producto.querySelector(".precio").textContent
    );

    const cantidad = parseInt(
      producto.querySelector(".quantity").value
    );

    subtotal += precio * cantidad;

    cantidadProductos += cantidad;

  });

  const envio = 10;

  document.getElementById("cantidad-productos").textContent =
    cantidadProductos;

  document.getElementById("subtotal").textContent =
    "$" + subtotal.toFixed(2);

  document.getElementById("total").textContent =
    "$" + (subtotal + envio).toFixed(2);

}

plusButtons.forEach(button => {

  button.addEventListener("click", () => {

    const input =
      button.parentElement.querySelector(".quantity");

    input.value++;

    actualizarTotales();

  });

});

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

actualizarTotales();