const {
    buscarProductoActivosDB,
    buscarTodosLosProductosDB,
    buscarProductoPorIdDB,
    crearProductoDB,
    modificarProductoDB,
    desactivarProductoDB,
    activarProductoDB
  } = require("./productos.service");
  
    // GET /productos
    const buscarProductoActivos = async (req, res) => {
        const productos = await buscarProductoActivosDB();
    
        res.send(productos);
    };

    // GET /productos/admin
    const buscarTodosLosProductos = async (req, res) => {
        const productos = await buscarTodosLosProductosDB();
    
        res.send(productos);
    };
    
    // GET /productos/:id
    const buscarProductoPorId = async (req, res) => {
        const { id } = req.params;
    
        const producto = await buscarProductoPorIdDB(id);
    
        res.send(producto);
    };
    
    // POST /productos
    const crearProducto = async (req, res) => {
        const { nombre, descripcion, categoria, precio, stock,activo, imagen } = req.body;
        const producto = { nombre, descripcion, categoria, precio, stock, activo, imagen };
    
        const productoCreado = await crearProductoDB(producto);
    
        res.send(productoCreado);
    };
    
    // PUT /productos/:id
    const modificarProducto = async (req, res) => {
        const { nombre, descripcion, categoria, precio, stock, activo, imagen } = req.body;
        const { id } = req.params;
        const producto = {  nombre, descripcion, categoria, precio, stock, activo, imagen };
    
        const modificado = await modificarProductoDB(id, producto);
    
        res.send(modificado);
    };
    
    // PATCH /productos/:id/desactivar
    const desactivarProducto = async (req, res) => {
        const { id } = req.params;
    
        const eliminado = await desactivarProductoDB(id);
    
        res.send(eliminado);
    };
  
    // PATCH /productos/:id/activar
    const activarProducto = async (req, res) => {
        const { id } = req.params;
    
        const activado = await activarProductoDB(id);
    
        res.send(activado);
    };

  module.exports = {
    buscarProductoActivos,
    buscarTodosLosProductos,
    buscarProductoPorId,
    crearProducto,
    modificarProducto,
    desactivarProducto,
    activarProducto
  };
  