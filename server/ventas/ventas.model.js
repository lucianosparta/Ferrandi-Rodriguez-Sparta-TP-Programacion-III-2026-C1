const conexion = require("../sequelize");
const { DataTypes } = require("sequelize");

const SalesModel = conexion.define("Venta", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre_cliente: {
    type: DataTypes.STRING,
  },
  total: {
    type: DataTypes.FLOAT,
  },
});


module.exports = SalesModel;
