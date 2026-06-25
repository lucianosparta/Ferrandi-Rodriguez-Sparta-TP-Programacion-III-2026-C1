const {
  buscarDetalleVentaDB,
  buscarPorIdDetalleVentaDB,
  crearDetalleVentaDB,
  modificarDetalleVentaDB,
  eliminarDetalleVentaDB,
} = require("./detalle-venta.service");

// GET /detalle-ventas
const buscarDetalleVenta = async (req, res, next) => {
  try {
    const detalleVenta = await buscarDetalleVentaDB();

    res.send(detalleVenta);
  } catch (error) {
    next(error);
  }
};

// GET /detalle-ventas/:id
const buscarPorIdDetalleVenta = async (req, res, next) => {
  try {
    const { id } = req.params;
    const detalleVenta = await buscarPorIdDetalleVentaDB(id);

    if (!detalleVenta) {
      return res.status(404).send({ error: "Usuario no encontrado" });
    }

    res.send(detalleVenta);
  } catch (error) {
    next(error);
  }
};

// POST /detalle-ventas
const crearDetalleVenta = async (req, res, next) => {
  try {
    const { venta_id, producto_id, cantidad, precio_unitario, subtotal } =
      req.body;

    const detalleVenta = {
      venta_id,
      producto_id,
      cantidad,
      precio_unitario,
      subtotal,
    };

    const detalleVentaCreado = await crearDetalleVentaDB(detalleVenta);

    res.send(detalleVentaCreado);
  } catch (error) {
    next(error);
  }
};

// PUT /detalle-ventas/:id
const modificarDetalleVenta = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { venta_id, producto_id, cantidad, precio_unitario, subtotal } =
      req.body;

    const detalleVentaExiste = await buscarPorIdDetalleVentaDB(id);

    if (!detalleVentaExiste) {
      return res
        .status(404)
        .send({ error: "No se puede modificar, el detalle-venta no existe" });
    }

    const detalleVenta = {
      venta_id,
      producto_id,
      cantidad,
      precio_unitario,
      subtotal,
    };

    const detalleVentaModificado = await modificarDetalleVentaDB(
      id,
      detalleVenta,
    );

    res.send(detalleVentaModificado);
  } catch (error) {
    next(error);
  }
};

// DELETE /detalle-ventas/:id
const eliminarDetalleVenta = async (req, res, next) => {
  try {
    const { id } = req.params;

    const detalleVentaExiste = await buscarPorIdDetalleVentaDB(id);

    if (!detalleVentaExiste) {
      return res
        .status(404)
        .send({ error: "No se puede eliminar, el detalle-venta no existe" });
    }

    const detalleVentaEliminado = await eliminarDetalleVentaDB(id);

    res.send(detalleVentaEliminado);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  buscarDetalleVenta,
  buscarPorIdDetalleVenta,
  crearDetalleVenta,
  modificarDetalleVenta,
  eliminarDetalleVenta,
};
