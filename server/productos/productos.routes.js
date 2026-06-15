const {
  buscarProductoActivos,
  buscarTodosLosProductos,
  buscarProductoPorId,
  crearProducto,
  modificarProducto,
  desactivarProducto,
  activarProducto
} = require("./productos.controller");

// defino el router
const productoRouter = require("express").Router();

// const express = require("express");
// const router = express.Router();

// cliente
productoRouter.get("/", buscarProductoActivos);
// Solo para Admin
productoRouter.get("/admin", buscarTodosLosProductos);

productoRouter.get("/:id", buscarProductoPorId);

productoRouter.post("/", crearProducto);

productoRouter.put("/:id", modificarProducto);

productoRouter.patch("/:id/desactivar", desactivarProducto);

productoRouter.patch("/:id/activar", activarProducto);

module.exports = productoRouter;
