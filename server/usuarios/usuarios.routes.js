const {
    buscarUsuariosActivos,
    buscarTodosLosUsuarios,
    buscarUsuarioPorId,
    crearUsuario,
    modificarUsuario,
    desactivarUsuario,
    activarUsuario
  } = require("./usuarios.controller");
  
  const usuarioRouter = require("express").Router();
  
  // const express = require("express");
  // const router = express.Router();
  
  // Busqueda de usuarios activos
  usuarioRouter.get("/", buscarUsuariosActivos);
  // Busqueda de usuarios activos y no activos
  usuarioRouter.get("/admin", buscarTodosLosUsuarios);
  
  usuarioRouter.get("/:id", buscarUsuarioPorId);
  
  usuarioRouter.post("/", crearUsuario);
  
  usuarioRouter.put("/:id", modificarUsuario);
  
  usuarioRouter.patch("/:id/desactivar", desactivarUsuario);
  
  usuarioRouter.patch("/:id/activar", activarUsuario);
  
  module.exports = usuarioRouter;
  