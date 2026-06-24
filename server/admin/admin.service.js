const Usuario = require("../usuarios/usuarios.model");
const Producto = require("../productos/productos.model");
const Venta = require("../ventas/ventas.model");

const obtenerProductosDB = async () => {
  try {
    const productos = await Producto.findAll();
    return productos;
  } catch (error) {
    throw error;
  }
};

const obtenerProductoPorIdDB = async (id) => {
  try {
    const producto = await Producto.findByPk(id);
    return producto;
  } catch (error) {
    throw error;
  }
};

const crearProductoDB = async (datos, nombreImagen) => {
  try {
    const nuevoProducto = await Producto.create({
      ...datos,
      imagen: nombreImagen,
      activo: true
    });
    return nuevoProducto;
  } catch (error) {
    throw error;
  }
};

const actualizarProductoDB = async (id, datos, nombreImagen) => {
  try {
    const producto = await Producto.findByPk(id);

    if (!producto) {
      throw new Error("Producto no encontrado");
    }

    await producto.update({
      ...datos,
      ...(nombreImagen && { imagen: nombreImagen })
    });

    return producto;
  } catch (error) {
    throw error;
  }
};


const desactivarProductoDB = async (id) => {
  try {
    const producto = await Producto.findByPk(id);

    if (!producto) {
      throw new Error("Producto no encontrado");
    }

    await producto.update({ activo: false });
    return producto;
  } catch (error) {
    throw error;
  }
};

const activarProductoDB = async (id) => {
  try {
    const producto = await Producto.findByPk(id);

    if (!producto) {
      throw new Error("Producto no encontrado");
    }

    await producto.update({ activo: true });
    return producto;
  } catch (error) {
    throw error;
  }
};

// Obtener todas las ventas con productos
const obtenerVentasDB = async () => {
  try {
    const Detalle_venta = require("../detalle-venta/detalle-venta.model");

    const ventas = await Venta.findAll({
      include: {
        model: Detalle_venta,
        as: "detalles",
        include: {
          model: Producto,
          attributes: ["id", "nombre", "precio"]
        }
      }
    });

    // Mapear productos desde los detalles
    const ventasConProductos = ventas.map(venta => {
      return {
        ...venta.toJSON(),
        productos: venta.detalles ? venta.detalles.map(d => d.Producto) : []
      };
    });

    return ventasConProductos;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  obtenerProductosDB,
  obtenerProductoPorIdDB,
  crearProductoDB,
  actualizarProductoDB,
  desactivarProductoDB,
  activarProductoDB,
  obtenerVentasDB
};




