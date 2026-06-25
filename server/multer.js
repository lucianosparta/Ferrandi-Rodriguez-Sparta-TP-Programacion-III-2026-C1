const multer = require("multer");

const middlewareMulter = multer({
    limits: {
        fileSize: 1024 * 1024 * 4, // 4MB 
    },
    fileFilter: (req, file, callback) => {
        const tiposPermitidos = ["png", "jpg", "jpeg", "webp"];
        const tipo = file.mimetype.split("/")[1];
        const esImagenPermitida = tiposPermitidos.includes(tipo);

        if (esImagenPermitida) {
            callback(null, true); 
        } else {
            callback(new Error("El archivo no es una imagen"), false);
        }
    },
    storage: multer.diskStorage({
        filename: (req, file, callback) => {
            callback(null, `IMG-${Date.now()}.${file.mimetype.split("/")[1]}`);
        },
        destination: (req, file, callback) => {
            callback(null, "server/uploads/");
        },
    }),
});

module.exports = middlewareMulter;