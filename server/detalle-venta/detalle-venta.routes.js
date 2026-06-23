const {
  buscarDetalleVenta,
  buscarPorIdDetalleVenta,
  crearDetalleVenta,
  modificarDetalleVenta,
  eliminarDetalleVenta,
} = require("./detalle-venta.controller");

const detalleVentaRouter = require("express").Router();

detalleVentaRouter.get("/", buscarDetalleVenta);

detalleVentaRouter.get("/:id", buscarPorIdDetalleVenta);

detalleVentaRouter.post("/", crearDetalleVenta);

detalleVentaRouter.put("/", modificarDetalleVenta);

detalleVentaRouter.delete("/", eliminarDetalleVenta);

module.exports = detalleVentaRouter;
