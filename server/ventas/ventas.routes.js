const {
  buscarVentas,
  buscarVentasPorId,
  crearVenta,
  modificarVenta,
  eliminarVenta,
  registrarVenta,
} = require("./ventas.controller");

const {
  validarId,
  validarVenta,
  validarRegistroVenta,
} = require("./ventas.middlewares");

const ventaRouter = require("express").Router();

ventaRouter.get("/", buscarVentas);

ventaRouter.get("/:id", validarId, buscarVentasPorId);

ventaRouter.post("/", validarVenta, crearVenta);

ventaRouter.put("/:id", validarId, validarVenta, modificarVenta);

ventaRouter.delete("/:id", validarId, eliminarVenta);

ventaRouter.post("/registro-venta", validarRegistroVenta, registrarVenta);

module.exports = ventaRouter;
