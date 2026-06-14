// 1. Crear el servidor
const express = require("express");
const router = express.Router();

// 2. Definir rutas
// 3. Definir acciones (métodos HTTP) (GET, POST, PUT, PATCH, DELETE)
// router.accion("ruta", (req, res) => { // lógica });
router.get("/productos", (req, res) => {
  // QueryParams
  const queryParams = req.query;
  console.log(queryParams);
  const page = queryParams.page || 1;
  const limit = queryParams.limit || 10;
  console.log(page, limit);

  // SIEMPRE AL FINAL, NO SE PUEDE MODIFICAR DESPUÉS
  res.send("productos en el send");
});

router.get("/consolas", (req, res) => {
  res.send("consolas");
});

router.get("/video-juegos", (req, res) => {
  res.send("video-juegos");
});


// EXPORTAR ROUTER
module.exports = router;
