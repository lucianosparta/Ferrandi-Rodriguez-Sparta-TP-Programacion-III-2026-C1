const { Sequelize } = require("sequelize");

// CONEXION con METODO SEQUELIZE, hay otro metodos de conexion
// 1° = db(nombre de la DB):"2026-c1", 2° = usr: "root", 3° = pass: "123456", 4° = PARAMETROS OPCIONALES definir host dialecto y puerto
const conexion = new Sequelize(
    // yo los configure en el archivo .env -> cada uno en su proyecto deberia ponerlo!
    process.env.DB_NAME, //2026-c1
    process.env.DB_USER, //root
    process.env.DB_PASSWORD, // 123456(esa fue la contraseña del profesor) o ""(si es vacio)
    {
        host: process.env.DB_HOST, // url: 'http://127.0.0.1:3306' es lo mismo url: 'http://localhost:3306'
        dialect: "mysql",
        port: process.env.DB_PORT, // default 3306
    }
);

// CONEXION con METODO STRING -> SE ADAPTA A DISTINTOS MOTORES
// const conexion = new Sequelize({dialect}://{usuario}:{contraseña}@{host}:{puerto}/{nombreDB})
// const conexion = new Sequelize("mysql://root:123456@localhost:3307/2026-c1");


module.exports = conexion
