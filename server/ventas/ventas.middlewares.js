const z = require("zod");

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

const validarVenta = (req, res, next) => {
  const Venta = z.object({
    nombre_cliente: z.string().min(1, "El nombre es obligatorio"),
    total: z.coerce.number().positive("El total debe ser mayor a 0"),
  });

  const { nombre_cliente, total } = req.body;

  Venta.parse({ nombre_cliente, total });

  next();
};

module.exports = { validarId, validarVenta };
