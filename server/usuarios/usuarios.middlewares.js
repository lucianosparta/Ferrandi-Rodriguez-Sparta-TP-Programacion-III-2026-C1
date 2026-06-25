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

const validarUsuario = (req, res, next) => {
  const Usuario = z.object({
    email: z.string().email("El email no es válido"),
    password: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres"),
  });

  const { email, password } = req.body;

  Usuario.parse({ email, password });

  next();
};

module.exports = { validarId, validarUsuario };
