const z = require("zod");
const ProductModel = require("../productos/productos.model");
const SalesModel = require("../ventas/ventas.model");

const validarId = (req, res, next) => {
  const Id = z.object({
    id: z.coerce
      .number()
      .int()
      .positive("El ID debe ser un número entero positivo"),
  });

  Id.parse(req.params);

  next();
};

const validarDetalleVenta = (req, res, next) => {
  const DetalleVenta = z.object({
    venta_id: z.coerce
      .number()
      .int()
      .positive("El campo 'venta_id' debe ser un entero positivo"),
    producto_id: z.coerce
      .number()
      .int()
      .positive("El campo 'productos_id' debe ser un entero positivo"),
    cantidad: z.coerce
      .number()
      .int()
      .positive("La cantidad debe ser mayor a 0"),
    precio_unitario: z.coerce
      .number()
      .positive("El precio unitario debe ser mayor a 0"),
    subtotal: z.coerce.number().positive("El subtotal debe ser mayor a 0"),
  });

  const { venta_id, producto_id, cantidad, precio_unitario, subtotal } =
    req.body;

  DetalleVenta.parse({
    venta_id,
    producto_id,
    cantidad,
    precio_unitario,
    subtotal,
  });

  next();
};

const validarForeignKeys = async (req, res, next) => {
  const { venta_id, producto_id } = req.body;

  const venta = await SalesModel.findByPk(venta_id);

  if (!venta) {
    return res
      .status(404)
      .send({ error: `No existe una venta con id ${venta_id}` });
  }

  const producto = await ProductModel.findByPk(producto_id);

  if (!producto) {
    return res
      .status(404)
      .send({ error: `No existe un producto con id ${producto_id}` });
  }

  next();
};

module.exports = { validarId, validarDetalleVenta, validarForeignKeys };
