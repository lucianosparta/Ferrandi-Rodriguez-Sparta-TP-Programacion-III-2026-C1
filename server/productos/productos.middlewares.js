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

const validarProducto = (req, res, next) => {
  const Producto = z.object({
    nombre: z.string().min(1, "El nombre es obligatorio"),
    descripcion: z.string().min(1, "La descripción es obligatoria"),
    categoria: z.enum(
      ["consolas", "videojuegos"],
      "La categoría debe ser 'consolas' o 'videojuegos'",
    ),
    precio: z.coerce.number().positive("El precio debe ser mayor a 0"),
    stock: z.coerce
      .number()
      .int()
      .nonnegative("El stock no puede ser negativo"),
    imagen: z.string().optional(),
  });

  const { nombre, descripcion, categoria, precio, stock, imagen } = req.body;
  // const { filename } = req.file;

  Producto.parse({
    nombre,
    descripcion,
    categoria,
    precio,
    stock,
    // filename,
    imagen,
  });

  next();
};

module.exports = { validarId, validarProducto };
