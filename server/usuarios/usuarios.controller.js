const {
    buscarUsuariosActivosDB,
    buscarTodosLosUsuariosDB,
    buscarUsuarioPorIdDB,
    crearUsuarioDB,
    modificarUsuarioDB,
    desactivarUsuarioDB,
    activarUsuarioDB
  } = require("./usuarios.service");
  
    // GET /usuarios
    const buscarUsuariosActivos = async (req, res) => {
        const usuarios = await buscarUsuariosActivosDB();
    
        res.send(usuarios);
    };

    // GET /usuarios/admin
    const buscarTodosLosUsuarios = async (req, res) => {
        const usuarios = await buscarTodosLosUsuariosDB();
    
        res.send(usuarios);
    };
    
    // GET /usuarios/:id
    const buscarUsuarioPorId = async (req, res) => {
        const { id } = req.params;
    
        const usuario = await buscarUsuarioPorIdDB(id);
    
        res.send(usuario);
    };
    
    // POST /usuarios
    const crearUsuario = async (req, res) => {
        const { nombre, apellido, usuario, email, password, activo } = req.body;
        const usuarioBody = { nombre, apellido, usuario, email, password, activo };
    
        const usuarioCreado = await crearUsuarioDB(usuarioBody);
    
        res.send(usuarioCreado);
    };
    
    // PUT /usuarios/:id
    const modificarUsuario = async (req, res) => {
        const { nombre, apellido, usuario, email, password, activo  } = req.body;
        const { id } = req.params;
        const usuarioBody = {  nombre, apellido, usuario, email, password, activo  };
    
        const modificado = await modificarUsuarioDB(id, usuarioBody);
    
        res.send(modificado);
    };
    
    // PATCH /usuarios/:id/desactivar
    const desactivarUsuario = async (req, res) => {
        const { id } = req.params;
    
        const desactivado = await desactivarUsuarioDB(id);
    
        res.send(desactivado);
    };
  
    // PATCH /usuarios/:id/activar
    const activarUsuario = async (req, res) => {
        const { id } = req.params;
    
        const activado = await activarUsuarioDB(id);
    
        res.send(activado);
    };

  module.exports = {
    buscarUsuariosActivos,
    buscarTodosLosUsuarios,
    buscarUsuarioPorId,
    crearUsuario,
    modificarUsuario,
    desactivarUsuario,
    activarUsuario
  };
  