require("dotenv").config();  //leer .env

const express = require("express");
const cors = require("cors");
const conexion = require("./sequelize");

// Incializacion
const app = express();

// Config
app.use(cors());
app.use(express.json());

const productosRoutes = require("./productos/productos.routes");
const usuariosRoutes = require("./usuarios/usuarios.routes")
const detalleVentaRoutes = require("./detalle-venta/detalle-venta.routes")

require("./relaciones");

// Rutas
app.use("/productos", productosRoutes);
app.use("/usuarios", usuariosRoutes);
app.use("/detalle-venta", detalleVentaRoutes);

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