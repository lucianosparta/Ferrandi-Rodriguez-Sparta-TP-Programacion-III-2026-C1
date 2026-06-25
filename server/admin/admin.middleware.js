// Middleware para validar datos de producto
const Producto = require("../productos/productos.model");

const validarProducto = async (req, res, next) => {
    const errors = [];
    const { nombre, descripcion, categoria, precio, stock } = req.body;
    const { id } = req.params; // id solo existe en actualización

    // Validar nombre
    if (!nombre || nombre.trim().length === 0) {
      errors.push("El nombre no puede estar vacío");
    } else if (nombre.trim().length < 2) {
      errors.push("El nombre debe tener al menos 2 caracteres");
    }
  
    // Validar descripción - Es opcional en edición
    if (id && descripcion === undefined) {
      // En edición, descripción es opcional, seguir
    } else {
      if (!descripcion || descripcion.trim().length === 0) {
        errors.push("La descripción no puede estar vacía");
      } else if (descripcion.trim().length < 5) {
        errors.push("La descripción debe tener al menos 5 caracteres");
      }
    }
  
    // Validar categoría
    if (!categoria || categoria === "") {
      errors.push("Debes seleccionar una categoría");
    } else if (!["consolas", "videojuegos"].includes(categoria.toLowerCase())) {
      errors.push("La categoría debe ser 'consolas' o 'videojuegos'");
    }
  
    // Validar precio
    if (!precio || precio === "") {
      errors.push("El precio no puede estar vacío");
    } else if (isNaN(precio) || parseFloat(precio) <= 0) {
      errors.push("El precio debe ser mayor a 0");
    }
  
    // Validar stock
    if (stock === undefined || stock === "") {
      errors.push("El stock no puede estar vacío");
    } else if (isNaN(stock) || parseInt(stock) < 0) {
      errors.push("El stock debe ser un número no negativo");
    }

    // Validación adicional: nombre duplicado en la misma categoría (específica de admin)
    try {
      const productoDuplicado = await Producto.findOne({
        where: {
          nombre: nombre.trim(),
          categoria: categoria.toLowerCase()
        }
      });

      // Si existe un duplicado y no es el mismo producto (en edición)
      if (productoDuplicado && (!id || productoDuplicado.id !== parseInt(id))) {
        errors.push(`Ya existe un producto llamado "${nombre}" en la categoría ${categoria}`);
      }
    } catch (error) {
      console.error("Error validando duplicado:", error);
      errors.push("Error al validar el producto");
    }

    // Si hay errores, retornarlos (preservar valores del formulario)
    if (errors.length > 0) {
      // Crear objeto con los valores para repoblar el formulario
      const producto = id ? { ...req.body, id } : req.body;
      return res.status(400).render("producto-form", {
        producto,
        errors,
        exito: null
      });
    }
  
    next();
  };

   // Middleware para validar imagen en creación
   const validarImagenCrear = (req, res, next) => {
     // En creación, la imagen es obligatoria
     if (!req.file) {
       const errors = ["La imagen es requerida"];
       return res.status(400).render("producto-form", {
         producto: req.body,
         errors,
         exito: null
       });
     }

     // Validar que sea un archivo de imagen permitido (jpg, jpeg, png)
     const tiposPermitidos = ["image/jpeg", "image/png"];
     if (!tiposPermitidos.includes(req.file.mimetype)) {
       const errors = ["Solo se permiten imágenes en formato JPG, JPEG o PNG"];
       return res.status(400).render("producto-form", {
         producto: req.body,
         errors,
         exito: null
       });
     }

     next();
   };

   // Middleware para validar imagen en edición (opcional)
   const validarImagenEditar = (req, res, next) => {
     // En edición, la imagen es opcional
     if (req.file) {
       const tiposPermitidos = ["image/jpeg", "image/png"];
       if (!tiposPermitidos.includes(req.file.mimetype)) {
         const errors = ["Solo se permiten imágenes en formato c"];
         return res.status(400).render("producto-form", {
           producto: req.body,
           errors,
           exito: null
         });
       }
     }

     next();
   };

    // Middleware para formatear datos
    const formatearProducto = (req, res, next) => {
      if (req.body.nombre) {
        req.body.nombre = req.body.nombre.trim();
      }
      if (req.body.descripcion) {
        req.body.descripcion = req.body.descripcion.trim();
      }
      if (req.body.categoria) {
        req.body.categoria = req.body.categoria.trim().toLowerCase();
      }
      if (req.body.precio) {
        req.body.precio = parseFloat(req.body.precio);
      }
      if (req.body.stock) {
        req.body.stock = parseInt(req.body.stock);
      }

      next();
    };

    module.exports = {
      validarProducto,
      validarImagenCrear,
      validarImagenEditar,
      formatearProducto
    };


