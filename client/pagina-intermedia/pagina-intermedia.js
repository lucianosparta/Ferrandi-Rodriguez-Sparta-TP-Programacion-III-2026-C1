const metodoPago = document.getElementById("metodo-pago");

const formTarjeta = document.getElementById("form-tarjeta");

const nombre = document.getElementById("nombre");

const apellido = document.getElementById("apellido");

const numeroTarjeta = document.getElementById("numero-tarjeta");

const titular = document.getElementById("titular");

const vencimiento = document.getElementById("vencimiento");

const cvv = document.getElementById("cvv");

const documento = document.getElementById("documento");

const telefono = document.getElementById("telefono");

const boton = document.getElementById("realizar-pedido");

const modalElemento = document.getElementById("modalConfirmar");

const modal = new bootstrap.Modal(modalElemento);

const confirmarCompra = document.getElementById("confirmarCompra");

function mostrarError(input, mensaje) {

  let helper =
    input.nextElementSibling;

  if (!helper || !helper.classList.contains("text-danger")) {

    helper =
      document.createElement("small");

    helper.classList.add("text-danger");

    input.insertAdjacentElement(
      "afterend",
      helper
    );
  }

  helper.textContent = mensaje;
}

function ocultarError(input) {

  const helper =
  input.nextElementSibling;

  if (helper && helper.classList.contains("text-danger")) {

  helper.remove();
  }
}

function validarFormulario() {

  let valido =
    nombre.value.trim().length >= 2 &&
    apellido.value.trim().length >= 2;

  if (metodoPago.value === "tarjeta") {

    const regexVencimiento =
      /^\d{2}\/\d{2}$/;

    valido =
      valido &&
      numeroTarjeta.value.length === 16 &&
      titular.value.trim().length >= 2 &&
      regexVencimiento.test(vencimiento.value) &&
      cvv.value.length === 3 &&
      documento.value.length >= 7 &&
      telefono.value.length >= 8 &&
      telefono.value.length <= 12;
  }

  boton.disabled = !valido;
}

// mostrar form tarjeta

metodoPago.addEventListener("change", () => {

  if (metodoPago.value === "tarjeta") {
    formTarjeta.classList.remove("d-none"); // d-none clase de Bootstrap que sirve para ocultar un elemento -> intermente hace display: none;
  } else {
    formTarjeta.classList.add("d-none");
  }
  validarFormulario();
});

// NOMBRE

nombre.addEventListener("input", () => {

  if (nombre.value.trim().length < 2) {

    mostrarError(
      nombre,
      "Debe completar el campo"
    );

  } else {

    ocultarError(nombre);
  }
  validarFormulario()
});

// APELLIDO

apellido.addEventListener("input", () => {

  if (apellido.value.trim().length < 2) {

    mostrarError(
      apellido,
      "Debe completar el campo"
    );

  } else {

    ocultarError(apellido);
  }
  validarFormulario()
});

// NUMERO TARJETA

numeroTarjeta.addEventListener("input", () => {

  numeroTarjeta.value =
    numeroTarjeta.value
      .replace(/\D/g, "")
      .slice(0, 16);

  if (numeroTarjeta.value.length < 16) {

    mostrarError(
      numeroTarjeta,
      "La tarjeta debe contener 16 números"
    );

  } else {

    ocultarError(numeroTarjeta);
  }
  validarFormulario()
});


// TITULAR

titular.addEventListener("input", () => {

  if (titular.value.trim().length < 2) {

    mostrarError(
      titular,
      "Debe completar el campo"
    );

  } else {

    ocultarError(titular);
  }
  validarFormulario()
});


// VENCIMIENTO

vencimiento.addEventListener("input", () => {

  let valor =
    vencimiento.value
      .replace(/\D/g, "")
      .slice(0, 4);

  if (valor.length >= 3) {

    valor =
      valor.slice(0, 2) +
      "/" +
      valor.slice(2);
  }

  vencimiento.value = valor;

  if (vencimiento.value.length < 5) {

    mostrarError(
      vencimiento,
      "Formato válido: MM/AA"
    );

  } else {

    ocultarError(vencimiento);
  }
  validarFormulario()
});


// CVV

cvv.addEventListener("input", () => {

  cvv.value =
    cvv.value
      .replace(/\D/g, "")
      .slice(0, 3);

  if (cvv.value.length < 3) {

    mostrarError(
      cvv,
      "Debe contener 3 números"
    );

  } else {

    ocultarError(cvv);
  }
  validarFormulario()
});


// DOCUMENTO

documento.addEventListener("input", () => {

  documento.value =
    documento.value
      .replace(/\D/g, "")
      .slice(0, 8);
  validarFormulario()
    });


// telefono

telefono.addEventListener("input", () => {

telefono.value =
  telefono.value
    .replace(/\D/g, "")
    .slice(0, 12);
if (
  telefono.value.length < 8 ||
  telefono.value.length > 12
) {
  mostrarError(
    telefono,
    "Debe contener entre 8 y 12 números"
  );
} else {
  ocultarError(telefono);
}
validarFormulario();
});

boton.addEventListener("click", () => {

  if (!boton.disabled) {

    modal.show();

  }
});

confirmarCompra.addEventListener("click", () => {

  window.location.href =
    "../ticket/ticket.html";

});