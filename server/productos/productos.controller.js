const {
  buscarProductoActivosDB,
  buscarTodosLosProductosDB,
  buscarProductoPorIdDB,
  crearProductoDB,
  modificarProductoDB,
  desactivarProductoDB,
  activarProductoDB,
} = require("./productos.service");

// GET /productos
const buscarProductoActivos = async (req, res, next) => {
  try {
    const productos = await buscarProductoActivosDB();

    res.send(productos);
  } catch (error) {
    next(error);
  }
};

// GET /productos/admin
const buscarTodosLosProductos = async (req, res, next) => {
  try {
    const productos = await buscarTodosLosProductosDB();

    res.send(productos);
  } catch (error) {
    next(error);
  }
};

// GET /productos/:id
const buscarProductoPorId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const producto = await buscarProductoPorIdDB(id);

    if (!producto) {
      return res.status(404).send({ error: "Producto no encontrado" });
    }

    res.send(producto);
  } catch (error) {
    next(error);
  }
};

// POST /productos
const crearProducto = async (req, res, next) => {
  try {
    const { nombre, descripcion, categoria, precio, stock, activo } =
      req.body;

    const imagen = req.file ? `images/${req.file.filename}` : null;

    const producto = {
      nombre,
      descripcion,
      categoria,
      precio,
      stock,
      activo,
      imagen,
    };

    const productoCreado = await crearProductoDB(producto);

    res.send(productoCreado);
  } catch (error) {
    next(error);
  }
};

// PUT /productos/:id
const modificarProducto = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, categoria, precio, stock, activo, imagen } =
      req.body;

    const productoExiste = await buscarProductoPorIdDB(id);

    if (!productoExiste) {
      return res
        .status(404)
        .send({ error: "No se puede modificar, el producto no existe" });
    }

    const producto = {
      nombre,
      descripcion,
      categoria,
      precio,
      stock,
      activo,
      imagen,
    };

    const productoModificado = await modificarProductoDB(id, producto);

    res.send(productoModificado);
  } catch (error) {
    next(error);
  }
};

// PATCH /productos/:id/desactivar
const desactivarProducto = async (req, res, next) => {
  try {
    const { id } = req.params;

    const productoExiste = await buscarProductoPorIdDB(id);

    if (!productoExiste) {
      return res
        .status(404)
        .send({ error: "No se puede desactivar, el producto no existe" });
    }

    const productoDesactivado = await desactivarProductoDB(id);

    res.send(productoDesactivado);
  } catch (error) {
    next(error);
  }
};

// PATCH /productos/:id/activar
const activarProducto = async (req, res, next) => {
  try {
    const { id } = req.params;

    const productoExiste = await buscarProductoPorIdDB(id);

    if (!productoExiste) {
      return res
        .status(404)
        .send({ error: "No se puede activar, el producto no existe" });
    }

    const productoActivado = await activarProductoDB(id);

    res.send(productoActivado);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  buscarProductoActivos,
  buscarTodosLosProductos,
  buscarProductoPorId,
  crearProducto,
  modificarProducto,
  desactivarProducto,
  activarProducto,
};
