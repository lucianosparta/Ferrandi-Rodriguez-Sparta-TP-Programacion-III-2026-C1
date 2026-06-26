const express = require("express");
const router = express.Router();
const path = require("path");
const upload = require("../multer");

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
  formatearProducto
} = require("./admin.middleware");

// Rutas
router.get("/dashboard", mostrarDashboard);

router.get("/producto/nuevo", mostrarNuevoProducto);
router.get("/producto/:id/editar", mostrarEditarProducto);

// Crear producto con middlewares
router.post(
  "/producto/crear",
  upload.single("imagen"),
  formatearProducto,
  validarProducto,
  validarImagenCrear,
  crearProducto
);

// Actualizar producto con middlewares
router.post(
  "/producto/:id/actualizar",
  upload.single("imagen"),
  formatearProducto,
  validarProducto,
  validarImagenEditar,
  actualizarProducto
);

router.post("/producto/:id/desactivar", desactivarProducto);
router.post("/producto/:id/activar", activarProducto);

router.post("/ventas/descargar-excel", descargarExcel);

module.exports = router;



