const {
  buscarDetalleVentaDB,
  buscarPorIdDetalleVentaDB,
  crearDetalleVentaDB,
  modificarDetalleVentaDB,
  eliminarDetalleVentaDB,
} = require("./detalle-venta.service");

const buscarDetalleVenta = async (req, res) => {
  const detalleVenta = await buscarDetalleVentaDB();

  res.send(detalleVenta);
};

const buscarPorIdDetalleVenta = async (req, res) => {
  const { id } = req.params;
  const detalleVenta = await buscarPorIdDetalleVentaDB(id);

  res.send(detalleVenta);
};

const crearDetalleVenta = async (req, res) => {
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
};

const modificarDetalleVenta = async (req, res) => {
  const { venta_id, producto_id, cantidad, precio_unitario, subtotal } =
    req.body;

  const { id } = req.params;

  const detalleVenta = {
    venta_id,
    producto_id,
    cantidad,
    precio_unitario,
    subtotal,
  };

  const detalleVentaCreado = await modificarDetalleVentaDB(id, detalleVenta);

  res.send(detalleVentaCreado);
};

const eliminarDetalleVenta = async (req, res) => {
  const { id } = req.params;

  const detalleVentaEliminado = await eliminarDetalleVentaDB(id);

  res.send(detalleVentaEliminado);
};

module.exports = {
  buscarDetalleVenta,
  buscarPorIdDetalleVenta,
  crearDetalleVenta,
  modificarDetalleVenta,
  eliminarDetalleVenta,
};
