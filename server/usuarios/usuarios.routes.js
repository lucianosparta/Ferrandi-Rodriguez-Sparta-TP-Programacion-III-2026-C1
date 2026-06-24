const {
  buscarUsuariosActivos,
  buscarTodosLosUsuarios,
  buscarUsuarioPorId,
  crearUsuario,
  modificarUsuario,
  desactivarUsuario,
  activarUsuario,
  loginUsuario,
} = require("./usuarios.controller");

const { validarId, validarUsuario } = require("./usuarios.middlewares");

const usuarioRouter = require("express").Router();

// Login de usuarios
usuarioRouter.post("/login", loginUsuario);
// Busqueda de usuarios activos
usuarioRouter.get("/", buscarUsuariosActivos);
// Busqueda de usuarios activos y no activos
usuarioRouter.get("/admin", buscarTodosLosUsuarios);

usuarioRouter.get("/:id", validarId, buscarUsuarioPorId);

usuarioRouter.post("/", validarUsuario, crearUsuario);

usuarioRouter.put("/:id", validarId, validarUsuario, modificarUsuario);

usuarioRouter.patch("/:id/desactivar", validarId, desactivarUsuario);

usuarioRouter.patch("/:id/activar", validarId, activarUsuario);

module.exports = usuarioRouter;
