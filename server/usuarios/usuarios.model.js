const conexion = require("../sequelize");
const { DataTypes } = require("sequelize");

const UserModel = conexion.define(
  "Usuario", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
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
