const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {
  mostrarDashboard,
  mostrarNuevoProducto,
  mostrarEditarProducto,
  crearProducto,
  actualizarProducto,
  desactivarProducto,
  activarProducto,
  descargarExcel
} = require("./admin.controller");

const {
  validarProducto,
  validarImagenCrear,
  validarImagenEditar,
  sanitizarProducto
} = require("./admin.middleware");


// Rutas
router.get("/dashboard", mostrarDashboard);

router.get("/producto/nuevo", mostrarNuevoProducto);
router.get("/producto/:id/editar", mostrarEditarProducto);



router.post("/producto/:id/desactivar", desactivarProducto);
router.post("/producto/:id/activar", activarProducto);

router.post("/ventas/descargar-excel", descargarExcel);

module.exports = router;



