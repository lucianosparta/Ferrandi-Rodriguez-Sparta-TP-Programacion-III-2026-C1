const {
  buscarVentas,
  buscarVentasPorId,
  crearVenta,
  modificarVenta,
  eliminarVenta,
} = require("./ventas.controller");

const { validarId, validarVenta } = require("./ventas.middlewares");

const ventaRouter = require("express").Router();

ventaRouter.get("/", buscarVentas);

ventaRouter.get("/:id", validarId, buscarVentasPorId);

ventaRouter.post("/", validarVenta, crearVenta);

ventaRouter.put("/:id", validarId, validarVenta, modificarVenta);

ventaRouter.delete("/:id", validarId, eliminarVenta);

module.exports = ventaRouter;
