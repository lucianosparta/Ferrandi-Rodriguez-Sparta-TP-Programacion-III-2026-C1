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
  formatearProducto
} = require("./admin.middleware");

// Configurar multer para subida de imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../imagenes/productos"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const tiposPermitidos = /jpeg|jpg|png/;
    const extname = tiposPermitidos.test(path.extname(file.originalname).toLowerCase());
    const mimetype = tiposPermitidos.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Solo se permiten imágenes JPG, JPEG o PNG"));
    }
  }
});

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



