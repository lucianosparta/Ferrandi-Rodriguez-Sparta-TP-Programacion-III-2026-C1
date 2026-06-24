const DetalleVenta = require("./detalle-venta.model");

const buscarDetalleVentaDB = async () => {
  return await DetalleVenta.findAll();
};

const buscarPorIdDetalleVentaDB = async (id) => {
  return await DetalleVenta.findByPk(id);
};

const crearDetalleVentaDB = async (detalleVenta) => {
  return await DetalleVenta.create(detalleVenta);
};

const modificarDetalleVentaDB = async (id, detalleVenta) => {
  return await DetalleVenta.update(detalleVenta, { where: { id } });
};

const eliminarDetalleVentaDB = async (id) => {
  return await DetalleVenta.destroy({ where: { id } });
};

module.exports = {
  buscarDetalleVentaDB,
  buscarPorIdDetalleVentaDB,
  crearDetalleVentaDB,
  modificarDetalleVentaDB,
  eliminarDetalleVentaDB,
};
