require("dotenv").config();  //leer .env

const express = require("express");
const conexion = require("./sequelize")

// Incializacion
const app = express();

// Config
app.use(express.json());

const productosRoutes = require("./productos/productos.routes");

//Modelos de la DB
const ProductModel = require("./productos/productos.model");
const SalesModel = require("./ventas/ventas.model");
const UserModel = require("./usuarios/usuarios.model");
const DetailSaleModel = require("./detalle-venta/detalle-venta.model");

// Rutas
app.use("/productos", productosRoutes);

// Definicion de puertos 
const port = process.env.PORT || 3000;
const portDb = process.env.DB_PORT;

//Servir la app
(async () => {
  try {
    await conexion.authenticate();
    await conexion.sync({ alter: true });

    console.log("Base de datos conectada");
    console.log(`Base de datos funcionando en puerto ${portDb}`);

    app.listen(port, () => {
      console.log(`Servidor funcionando en puerto ${port}`);
    });

  } catch (error) {
    console.error("Error al conectar la BD:", error);
  }
})();