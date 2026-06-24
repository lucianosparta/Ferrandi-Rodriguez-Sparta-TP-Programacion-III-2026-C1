const conexion = require("../sequelize");
const { DataTypes } = require("sequelize");

const SalesModel = conexion.define(
  "Venta", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre_cliente: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: false,
  }},
  {
    tableName: "ventas"
  }
);


module.exports = SalesModel;
