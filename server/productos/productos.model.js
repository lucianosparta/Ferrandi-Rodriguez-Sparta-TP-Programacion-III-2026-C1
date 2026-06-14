const conexion = require("../sequelize");
const { DataTypes } = require("sequelize");

const ProductModel = conexion.define("Producto", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
  },
  descripcion: {
    type: DataTypes.STRING,
  },
  categoria: {
    type: DataTypes.ENUM(
        "consolas",
        "video-juegos"
    ),
  },
  precio: {
    type: DataTypes.FLOAT,
  },
  stock: {
    type: DataTypes.INTEGER,
  },
  imagen: {
    type: DataTypes.STRING,
  },
});


module.exports = ProductModel;
