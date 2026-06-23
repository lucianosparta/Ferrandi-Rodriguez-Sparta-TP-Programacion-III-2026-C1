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

const validarUsuario = (req, res, next) => {
  const Usuario = z.object({
    email: z.string().email("El email no es válido"),
    password: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres"),
  });

  const { email, password } = req.body;

  const resultado = Usuario.safeParse({ email, password });

  if (!resultado.success) {
    return res.status(400).send({ errores: resultado.error.issues });
  }

  next();
};

module.exports = { validarId, validarUsuario };
