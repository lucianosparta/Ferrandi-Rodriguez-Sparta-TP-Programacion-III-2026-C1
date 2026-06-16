const Usuario = require("./usuarios.model");


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

module.exports = {
    buscarUsuariosActivosDB,
    buscarTodosLosUsuariosDB,
    buscarUsuarioPorIdDB,
    crearUsuarioDB,
    modificarUsuarioDB,
    desactivarUsuarioDB,
    activarUsuarioDB
};
