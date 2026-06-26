const {
  crearDetalleVentaDB,
} = require("../detalle-venta/detalle-venta.service");
const {
  buscarProductoPorIdDB,
  modificarProductoDB,
} = require("../productos/productos.service");
const conexion = require("../sequelize");

const Ventas = require("./ventas.model");

const buscarVentasDB = async () => {
  return await Ventas.findAll();
};

const buscarVentasPorIdDB = async (id) => {
  return await Ventas.findByPk(id);
};

const crearVentaDB = async (venta, transaccion = null) => {
  return await Ventas.create(venta, { transaction: transaccion });
};

const modificarVentaDB = async (id, venta) => {
  const modificado = await Ventas.update(venta, { where: { id } });
  return modificado;
};

const eliminarVentaDB = async (id) => {
  return await Ventas.destroy({ where: { id } });
};

const registrarVentaDB = async (nombre_cliente, productos) => {
  const transaccion = await conexion.transaction();

  try {
    let total = 0;

    for (const producto of productos) {
      total += producto.precio * producto.cantidad;
    }

    const venta = await crearVentaDB({ nombre_cliente, total }, transaccion);

    for (const producto of productos) {
      const subtotal = producto.precio * producto.cantidad;

      await crearDetalleVentaDB(
        {
          venta_id: venta.id,
          producto_id: producto.id,
          cantidad: producto.cantidad,
          precio_unitario: producto.precio,
          subtotal: subtotal,
        },
        transaccion,
      );

      const productoDB = await buscarProductoPorIdDB(producto.id, transaccion);

      if (!productoDB) {
        throw new Error(
          `El producto "${producto.nombre}" ya no existe en la base de datos.`,
        );
      }
      if (productoDB.stock < producto.cantidad) {
        throw new Error(
          `Stock insuficiente para "${producto.nombre}". Stock disponible: ${productoDB.stock}`,
        );
      }
      
      const nuevoStock = productoDB.stock - producto.cantidad;
     
      await modificarProductoDB(producto.id, { stock: nuevoStock }, transaccion);
    }
    
    await transaccion.commit();
    return venta;
  } catch (error) {
    await transaccion.rollback();
    throw error;
  }
};

module.exports = {
  buscarVentasDB,
  buscarVentasPorIdDB,
  crearVentaDB,
  modificarVentaDB,
  eliminarVentaDB,
  registrarVentaDB,
};
