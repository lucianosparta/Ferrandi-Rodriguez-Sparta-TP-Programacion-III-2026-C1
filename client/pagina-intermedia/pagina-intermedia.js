const metodoPago =
  document.getElementById("metodo-pago");

const formTarjeta =
  document.getElementById("form-tarjeta");

metodoPago.addEventListener("change", () => {

  if (metodoPago.value === "tarjeta") {

    formTarjeta.classList.remove("d-none");

  } else {

    formTarjeta.classList.add("d-none");

  }

});
