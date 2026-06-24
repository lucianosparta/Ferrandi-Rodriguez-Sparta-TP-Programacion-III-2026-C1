const { buscarVentasDB, buscarVentasPorIdDB, crearVentaDB, modificarVentaDB, eliminarVentaDB} = require("./ventas.service");

const buscarVentas = async (req, res) => {
    const ventas = await buscarVentasDB;
    res.send(ventas)
};

const buscarVentasPorId = async (req, res) => {
    const { id } = req.params;
    const ventasId = await buscarVentasPorIdDB(id);

    res.send(ventasId);
};

const crearVenta = async (req, res) => {
    const { nombre_cliente, total } = req.body;
    const ventasBody = { nombre_cliente, total};

    const ventaCreada = await crearVentaDB(ventasBody);

    res.send(ventaCreada);
};

const modificarVenta = async (req, res) => {
    const { nombre_cliente, total} = req.body;
    const { id } = req.params;
    const ventasBody = { nombre_cliente, total};

    const modificada = await modificarVentaDB(id, ventasBody);

    res.send(modificada);
};

const eliminarVenta = async (req, res) => {
    const { id } = req.params;
    const eliminado = await eliminarVentaDB(id);

    res.send(eliminado);
};

module.exports = { buscarVentas, buscarVentasPorId, crearVenta, modificarVenta, eliminarVenta};