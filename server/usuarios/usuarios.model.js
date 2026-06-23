const conexion = require("../sequelize");
const { DataTypes } = require("sequelize");

const UserModel = conexion.define(
  "Usuario", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
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
