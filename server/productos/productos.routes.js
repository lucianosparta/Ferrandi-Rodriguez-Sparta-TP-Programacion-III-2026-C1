const {
  buscarProductoActivos,
  buscarTodosLosProductos,
  buscarProductoPorId,
  crearProducto,
  modificarProducto,
  desactivarProducto,
  activarProducto,
} = require("./productos.controller");

const { validarId, validarProducto } = require("./productos.middlewares");
const upload = require("../multer");

// defino el router
const productoRouter = require("express").Router();

// cliente
productoRouter.get("/", buscarProductoActivos);
// Solo para Admin
productoRouter.get("/admin", buscarTodosLosProductos);

productoRouter.get("/:id", validarId, buscarProductoPorId);

productoRouter.post("/", upload.single("imagen"), validarProducto, crearProducto);

productoRouter.put("/:id", validarId, validarProducto, modificarProducto);

productoRouter.patch("/:id/desactivar", validarId, desactivarProducto);

productoRouter.patch("/:id/activar", validarId, activarProducto);

module.exports = productoRouter;
