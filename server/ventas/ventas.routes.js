const { buscarVentas, buscarVentasPorId, crearVenta, modificarVenta, eliminarVenta } = require("./ventas.controller");

const ventaRouter = require("express").Router();

ventaRouter.get("/", buscarVentas);

ventaRouter.get("/:id", buscarVentasPorId);

ventaRouter.post("/", crearVenta);

ventaRouter.put("/:id", modificarVenta);

ventaRouter.delete("/:id", eliminarVenta);

module.exports = ventaRouter;