const {
  buscarDetalleVenta,
  buscarPorIdDetalleVenta,
  crearDetalleVenta,
  modificarDetalleVenta,
  eliminarDetalleVenta,
} = require("./detalle-venta.controller");

const {
  validarId,
  validarDetalleVenta,
  validarForeignKeys,
} = require("./detalle-venta.middlewares");

const detalleVentaRouter = require("express").Router();

detalleVentaRouter.get("/", buscarDetalleVenta);

detalleVentaRouter.get("/:id", validarId, buscarPorIdDetalleVenta);

detalleVentaRouter.post("/", validarDetalleVenta, validarForeignKeys, crearDetalleVenta);

detalleVentaRouter.put("/", validarId, validarDetalleVenta, modificarDetalleVenta);

detalleVentaRouter.delete("/", validarId, eliminarDetalleVenta);

module.exports = detalleVentaRouter;
