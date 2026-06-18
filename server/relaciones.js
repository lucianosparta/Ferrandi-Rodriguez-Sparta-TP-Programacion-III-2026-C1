const ProductModel = require("./productos/productos.model");
const SalesModel = require("./ventas/ventas.model");
const UserModel = require("./usuarios/usuarios.model");
const DetailSaleModel = require("./detalle-venta/detalle-venta.model");

// venta -> detalle-venta
SalesModel.hasMany(DetailSaleModel, {
  foreignKey: "venta_id",
  as: "detalles",
});

DetailSaleModel.belongsTo(SalesModel, {
  foreignKey: "venta_id",
});


// producto -> detalle-venta -> un registro de productos se relaciona con muchos registros de detail
ProductModel.hasMany(DetailSaleModel, {
  foreignKey: "producto_id",
  as: "detalles",
});
//Un registro de esta detailsale pertenece a un unico registro de producto
DetailSaleModel.belongsTo(ProductModel, {
  foreignKey: "producto_id",
});

// Exportar modelos ya relacionados
module.exports = {
  ProductModel,
  SalesModel,
  UserModel,
  DetailSaleModel,
};