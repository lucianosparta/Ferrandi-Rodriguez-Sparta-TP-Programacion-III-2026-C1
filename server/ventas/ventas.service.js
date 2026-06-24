const Ventas = require("./ventas.model");

const buscarVentasDB = async () => {
    return await Ventas.findAll();
};

const buscarVentasPorIdDB = async (id) => {
    return await Ventas.findByPk(id);
};

const crearVentaDB = async (venta) => {
    return await Ventas.create(venta);
};

const modificarVentaDB = async (id, venta) => {
    const modificado = await Ventas.update(venta, { where: { id } });
    return modificado;
};

const eliminarVentaDB = async (id) => {
    return await Ventas.destroy({ where: { id } });
}

module.exports = { buscarVentasDB, buscarVentasPorIdDB, crearVentaDB, modificarVentaDB, eliminarVentaDB};