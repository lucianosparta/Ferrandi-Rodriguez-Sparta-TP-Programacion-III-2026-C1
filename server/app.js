require("dotenv").config();  //leer .env

const express = require("express");
const app = express();

// Config
app.use(express.json());

const productosRoutes = require("./routes/productos.routes");

app.use("/productos", productosRoutes);

const port = process.env.PORT;

app.listen(port, () => {
    console.log("Servidor funcionandoo en el puerto " + port);
  });
