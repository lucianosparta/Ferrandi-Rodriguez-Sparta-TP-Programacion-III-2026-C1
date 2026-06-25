const z = require("zod");

const validarId = (req, res, next) => {
  const ID = z.object({
    id: z.coerce
      .number()
      .int()
      .positive("El ID debe ser un número entero positivo"),
  });

  const resultado = ID.safeParse(req.params);

  if (!resultado.success) {
    return res.status(400).send({ errores: resultado.error.issues });
  }

  next();
};

const validarVenta = (req, res, next) => {
  const Venta = z.object({
    nombre_cliente: z
      .string()
      .min(1, "El nombre es obligatorio"),
    total: z.coerce.number().positive("El total debe ser mayor a 0"),
  });

  const { nombre_cliente, total } = req.body;

  const resultado = Venta.safeParse({ nombre_cliente, total });

  if (!resultado.success) {
    return res.status(400).send({ errores: resultado.error.issues });
  }

  next();
};

module.exports = { validarId, validarVenta };