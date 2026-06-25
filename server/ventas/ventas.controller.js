const {
  buscarVentasDB,
  buscarVentasPorIdDB,
  crearVentaDB,
  modificarVentaDB,
  eliminarVentaDB,
} = require("./ventas.service");

// GET /ventas
const buscarVentas = async (req, res, next) => {
  try {
    const ventas = await buscarVentasDB;

    res.send(ventas);
  } catch (error) {
    next(error);
  }
};

// GET /ventas/:id
const buscarVentasPorId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const venta = await buscarVentasPorIdDB(id);

    if (!venta) {
      return res.status(404).send({ error: "Venta no encontrada" });
    }

    res.send(venta);
  } catch (error) {
    next(error);
  }
};

// POST /ventas
const crearVenta = async (req, res, next) => {
  try {
    const { nombre_cliente, total } = req.body;
    const venta = { nombre_cliente, total };

    const ventaCreada = await crearVentaDB(venta);

    res.send(ventaCreada);
  } catch (error) {
    next(error);
  }
};

// PUT /ventas/:id
const modificarVenta = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nombre_cliente, total } = req.body;

    const ventaExiste = await buscarVentasPorIdDB(id);

    if (!ventaExiste) {
      return res
        .status(404)
        .send({ error: "No se puede modificar, la venta no existe" });
    }

    const venta = { nombre_cliente, total };
    const ventaModificada = await modificarVentaDB(id, venta);

    res.send(ventaModificada);
  } catch (error) {
    next(error);
  }
};

// DELETE /ventas/:id
const eliminarVenta = async (req, res, next) => {
  try {
    const { id } = req.params;
    const ventaExiste = await buscarVentasPorIdDB(id);

    if (!ventaExiste) {
      return res
        .status(404)
        .send({ error: "No se puede eliminar, la venta no existe" });
    }

    const ventaEliminada = await eliminarVentaDB(id);

    res.send(ventaEliminada);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  buscarVentas,
  buscarVentasPorId,
  crearVenta,
  modificarVenta,
  eliminarVenta,
};
