const conexion = require("../sequelize");
const { DataTypes } = require("sequelize");

const UserModel = conexion.define(
  "Usuario", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
  },
  apellido: {
    type: DataTypes.STRING,
  },
  usuario: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  }},
  {
    tableName: "usuarios"
  }
);


module.exports = UserModel;
