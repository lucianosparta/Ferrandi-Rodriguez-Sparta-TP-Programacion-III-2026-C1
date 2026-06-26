const {
  buscarUsuariosActivosDB,
  buscarTodosLosUsuariosDB,
  buscarUsuarioPorIdDB,
  crearUsuarioDB,
  modificarUsuarioDB,
  desactivarUsuarioDB,
  activarUsuarioDB,
  loginUsuarioDB,
} = require("./usuarios.service");

const bcrypt = require("bcrypt");

// GET /usuarios
const buscarUsuariosActivos = async (req, res, next) => {
  try {
    const usuarios = await buscarUsuariosActivosDB();

    res.send(usuarios);
  } catch (error) {
    next(error);
  }
};

// GET /usuarios/admin
const buscarTodosLosUsuarios = async (req, res, next) => {
  try {
    const usuarios = await buscarTodosLosUsuariosDB();

    res.json(usuarios);
  } catch (error) {
    next(error);
  }
};

// GET /usuarios/:id
const buscarUsuarioPorId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const usuario = await buscarUsuarioPorIdDB(id);

    if (!usuario) {
      return res.status(404).send({ error: "Usuario no encontrado" });
    }

    res.send(usuario);
  } catch (error) {
    next(error);
  }
};

// POST /usuarios
const crearUsuario = async (req, res, next) => {
  try {
    const { email, password, activo } = req.body;
    const passwordHasheada = await bcrypt.hash(password, 10);
    const usuario = { email, password: passwordHasheada, activo };

    const usuarioCreado = await crearUsuarioDB(usuario);

    res.send(usuarioCreado);
  } catch (error) {
    next(error);
  }
};

// PUT /usuarios/:id
const modificarUsuario = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { email, password, activo } = req.body;

    const usuarioExiste = await buscarUsuarioPorIdDB(id);

    if (!usuarioExiste) {
      return res
        .status(404)
        .send({ error: "No se puede modificar, el usuario no existe" });
    }

    const usuario = { email, password, activo };
    const usuarioModificado = await modificarUsuarioDB(id, usuario);

    res.send(usuarioModificado);
  } catch (error) {
    next(error);
  }
};

// PATCH /usuarios/:id/desactivar
const desactivarUsuario = async (req, res, next) => {
  try {
    const { id } = req.params;
    const usuarioExiste = await buscarUsuarioPorIdDB(id);

    if (!usuarioExiste) {
      return res
        .status(404)
        .send({ error: "No se puede desactivar, el usuario no existe" });
    }

    const usuarioDesactivado = await desactivarUsuarioDB(id);

    res.send(usuarioDesactivado);
  } catch (error) {
    next(error);
  }
};

// PATCH /usuarios/:id/activar
const activarUsuario = async (req, res, next) => {
  try {
    const { id } = req.params;
    const usuarioExiste = await buscarUsuarioPorIdDB(id);

    if (!usuarioExiste) {
      return res
        .status(404)
        .send({ error: "No se puede activar, el usuario no existe" });
    }

    const usuarioActivado = await activarUsuarioDB(id);

    res.send(usuarioActivado);
  } catch (error) {
    next(error);
  }
};

const loginUsuario = async (req, res) => {
  const { email, password } = req.body;

  const usuarioLogin = await loginUsuarioDB(email, password);

  if (!usuarioLogin) {
      return res.status(401).send({ message: "Credenciales inválidas" });
  }

  const { password: _, ...usuarioSinPassword } = usuarioLogin.dataValues;

  res.send(usuarioSinPassword);
};

module.exports = {
  buscarUsuariosActivos,
  buscarTodosLosUsuarios,
  buscarUsuarioPorId,
  crearUsuario,
  modificarUsuario,
  desactivarUsuario,
  activarUsuario,
  loginUsuario,
};
