const Usuario = require("./usuarios.model");
const bcrypt = require("bcrypt");

const buscarUsuariosActivosDB = async () => {
    return await Usuario.findAll({
      where: {
        activo: true,
      },
    });
  };

const buscarTodosLosUsuariosDB  = async () => {
  return await Usuario.findAll();
};

const buscarUsuarioPorIdDB = async (id) => {
  return await Usuario.findByPk(id);
};

const crearUsuarioDB = async (usuario) => {
  return await Usuario.create(usuario);
};

const modificarUsuarioDB = async (id, usuario) => {
  const modificado = await Usuario.update(usuario, { where: { id } });
  return modificado;
};

const desactivarUsuarioDB = async (id) => {
  const desactivado = await Usuario.update(
    { activo: false },
    { where: { id } }
);
  return desactivado;
};

const activarUsuarioDB = async (id) => {
    return await Usuario.update(
      { activo: true },
      { where: { id } }
    );
};

const loginUsuarioDB = async (email, password) => {
    const usuarioLogin = await Usuario.findOne({ where: { email } });

    if (!usuarioLogin) {
      return null;
    }

    const passwordValida = await bcrypt.compare(password, usuarioLogin.password);

    if (!passwordValida) {
        return null;
    }

    return usuarioLogin;
};

module.exports = {
    buscarUsuariosActivosDB,
    buscarTodosLosUsuariosDB,
    buscarUsuarioPorIdDB,
    crearUsuarioDB,
    modificarUsuarioDB,
    desactivarUsuarioDB,
    activarUsuarioDB,
    loginUsuarioDB,
};
