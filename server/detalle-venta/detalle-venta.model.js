const conexion = require("../sequelize");
const { DataTypes } = require("sequelize");

const DetailSaleModel = conexion.define(
  "Detalle_venta", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  venta_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  producto_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cantidad: {
    type: DataTypes.INTEGER,
  },
  precio_unitario: {
    type: DataTypes.FLOAT,
  },
  subtotal: {
    type: DataTypes.FLOAT,
  }},
  {
    tableName: "detalle_ventas"
  }
);


module.exports = DetailSaleModel;
