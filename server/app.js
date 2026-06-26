require("dotenv").config();  //leer .env

const express = require("express");
const cors = require("cors");
const conexion = require("./sequelize");
const path = require("path");
const { ZodError } = require("zod");

// Incializacion
const app = express();

// Config
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Configurar EJS como motor de vistas
app.set("view engine", "ejs");
app.set("views",  path.join(__dirname, "views"));

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "..", "client")));
app.use("/images", express.static(path.join(__dirname, "public/images")));

const productosRoutes = require("./productos/productos.routes");
const usuariosRoutes = require("./usuarios/usuarios.routes")
const detalleVentaRoutes = require("./detalle-venta/detalle-venta.routes")
const ventaRoutes = require("./ventas/ventas.routes");
const adminRoutes = require("./admin/admin.routes");

require("./relaciones");

// Rutas
app.use("/productos", productosRoutes);
app.use("/usuarios", usuariosRoutes);
app.use("/detalle-venta", detalleVentaRoutes);
app.use("/ventas", ventaRoutes);
// Administrador (EJS)
app.use("/admin", adminRoutes);

// Definicion de puertos 
const port = process.env.PORT || 3000;
const portDb = process.env.DB_PORT;

// Manejador de errores global
app.use((error, req, res, next) => {

  if (error instanceof ZodError) {
    return res.status(400).send({ errores: error.issues }); 
  }

  console.error(error);
  res.status(500).send({ error: "Error interno del servidor" });
});

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