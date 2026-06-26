const {
    obtenerProductosDB,
    obtenerProductoPorIdDB,
    crearProductoDB,
    actualizarProductoDB,
    desactivarProductoDB,
    activarProductoDB,
    obtenerVentasDB
  } = require("./admin.service");

  // GET /admin/dashboard
  const mostrarDashboard = async (req, res) => {
    try {
      const productos = await obtenerProductosDB();
      const ventas = await obtenerVentasDB();

      // datos del usuario desde query->se envían desde el cliente
      const adminNombre = req.query.nombre || "Admin";
  
      res.render("dashboard", {
        admin: { nombre: adminNombre, id: 1 },
        productos,
        ventas
      });
    } catch (error) {
      console.error("Error:", error);
      res.redirect("/?mensaje=Error al cargar dashboard");
    }
  };
  
  // GET /admin/producto/nuevo -> Mostrar formulario de nuevo producto
  const mostrarNuevoProducto = (req, res) => {
    res.render("producto-form", {
      producto: null,
      errors: [],
      exito: null
    });
  };
  
  // GET /admin/producto/:id/editar -> Mostrar formulario de edición
  const mostrarEditarProducto = async (req, res) => {
    try {
      const { id } = req.params;
      const producto = await obtenerProductoPorIdDB(id);
  
      if (!producto) {
        return res.render("producto-form", {
          producto: null,
          errors: ["Producto no encontrado"],
          exito: null
        });
      }
  
      res.render("producto-form", {
        producto,
        errors: [],
        exito: null
      });
    } catch (error) {
      console.error("Error:", error);
      res.render("producto-form", {
        producto: null,
        errors: ["Error al cargar producto"],
        exito: null
      });
    }
  };
  
  // POST /admin/producto/crear 
  const crearProducto = async (req, res) => {
    try {
      const { nombre, descripcion, categoria, precio, stock } = req.body;
  
      await crearProductoDB(
        { nombre, descripcion, categoria, precio, stock },
        req.file.filename
      );

      // Redirigir con mensaje de éxito para Toastify
      res.redirect("/admin/dashboard?mensaje=Producto%20creado%20exitosamente&tipo=success");

    } catch (error) {
      console.error(error);
  
      res.render("producto-form", {
        producto: req.body,
        errors: [error.message || "Error al crear producto"],
        exito: null
      });
    }
  };
  
  // POST /admin/producto/:id/actualizar 
  const actualizarProducto = async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, descripcion, categoria, precio, stock } = req.body;
  
      const productoDatos = await actualizarProductoDB(
        id,
        { nombre, descripcion, categoria, precio, stock },
        req.file ? req.file.filename : null
      );

      // Redirigir con mensaje de éxito para Toastify
      res.redirect("/admin/dashboard?mensaje=Producto%20actualizado%20exitosamente&tipo=success");

    } catch (error) {
      console.error("Error:", error);
      const producto = await obtenerProductoPorIdDB(id);
      res.render("producto-form", {
        producto: producto || req.body,
        errors: [error.message || "Error al actualizar producto"],
        exito: null
      });
    }
  };

  // POST /admin/producto/:id/desactivar - Desactivar producto
  const desactivarProducto = async (req, res) => {
    try {
      const { id } = req.params;
      await desactivarProductoDB(id);
      res.redirect("/admin/dashboard");
    } catch (error) {
      console.error("Error:", error);
      res.redirect("/admin/dashboard?mensaje=Error al desactivar");
    }
  };

  // POST /admin/producto/:id/activar - Activar producto
  const activarProducto = async (req, res) => {
    try {
      const { id } = req.params;
      await activarProductoDB(id);
      res.redirect("/admin/dashboard");
    } catch (error) {
      console.error("Error:", error);
      res.redirect("/admin/dashboard?mensaje=Error al activar");
    }
  };

  // POST /admin/ventas/descargar-excel - Descargar ventas en Excel
  const descargarExcel = async (req, res) => {
    try {
      const ExcelJS = require("exceljs");
      const ventas = await obtenerVentasDB();
  
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Ventas");
  
      // Headers
      worksheet.columns = [
        { header: "ID", key: "id", width: 10 },
        { header: "Cliente", key: "nombre_cliente", width: 20 },
        { header: "Total", key: "total", width: 12 },
        { header: "Productos", key: "productos", width: 40},
        { header: "Fecha", key: "createdAt", width: 20 }
      ];
  
      // Datos
      ventas.forEach(venta => {
        const productosString = venta.productos && venta.productos.length > 0 ? venta.productos.map(p => p.nombre).join(', ') : '';
        worksheet.addRow({
          id: venta.id,
          nombre_cliente: venta.nombre_cliente,
          total: venta.total,
          productos: productosString,
          createdAt: new Date(venta.createdAt).toLocaleDateString("es-AR")
        });
      });
  
      res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
      res.setHeader("Content-Disposition", `attachment; filename="ventas_${new Date().toISOString().split("T")[0]}.xlsx"`);
  
      await workbook.xlsx.write(res);
    } catch (error) {
      console.error("Error:", error);
      res.redirect("/admin/dashboard?mensaje=Error al descargar");
    }
  };

  // GET /admin/logout - Salir
  const logout = (req, res) => {
    res.clearCookie("adminToken");
    res.redirect("/admin/login?mensaje=Sesión cerrada");
  };

  module.exports = {
    mostrarDashboard,
    mostrarNuevoProducto,
    mostrarEditarProducto,
    crearProducto,
    actualizarProducto,
    desactivarProducto,
    activarProducto,
    descargarExcel
  };

  
  
  
  