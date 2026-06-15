const Producto = require("./productos.model");


const buscarProductoActivosDB = async () => {
    return await Producto.findAll({
      where: {
        activo: true,
      },
    });
  };

const buscarTodosLosProductosDB  = async () => {
  return await Producto.findAll();
};

const buscarProductoPorIdDB = async (id) => {
  return await Producto.findByPk(id);
};

const crearProductoDB = async (producto) => {
  return await Producto.create(producto);
};

const modificarProductoDB = async (id, producto) => {
  const modificado = await Producto.update(producto, { where: { id } });
  return modificado;
};

const desactivarProductoDB = async (id) => {
  const eliminado = await Producto.update(
    { activo: false },
    { where: { id } }
);
  return eliminado;
};

const activarProductoDB = async (id) => {
    return await Producto.update(
      { activo: true },
      { where: { id } }
    );
  };

module.exports = {
    buscarProductoActivosDB,
    buscarTodosLosProductosDB,
    buscarProductoPorIdDB,
    crearProductoDB,
    modificarProductoDB,
    desactivarProductoDB,
    activarProductoDB
};
