# FRS Gaming 🎮

TP de **Programación III** (2026) — Ferrandi, Rodriguez, Sparta.

Tienda online de videojuegos y consolas con panel de administración, desarrollada con una arquitectura full-stack separando frontend estático y backend REST.

---

## Tecnologías

**Backend**
- Node.js + Express
- Sequelize + MySQL
- bcrypt (hash de contraseñas)
- Multer (subida de imágenes)
- Zod (validación de datos)
- EJS (vistas del panel admin)

**Frontend**
- HTML5 + CSS3
- Bootstrap 5.3
- JavaScript vanilla
- localStorage (carrito y tema)

---

## Estructura del proyecto

```
├── server/                  # Backend (Node.js + Express)
│   ├── productos/           # Modelo, rutas, controller, service y middlewares de productos
│   ├── usuarios/            # Modelo, rutas, controller, service y middlewares de usuarios
│   ├── admin/               # Controller, rutas, service y middlewares del panel admin
│   ├── ventas/              # Modelo, rutas, controller, service y middlewares de ventas
│   ├── detalle-venta/       # Modelo, rutas, controller, service y middlewares de detalle ventas
│   ├── public/
│   │   └── images/          # Imágenes subidas por el admin
│   ├── views/               # Vistas EJS del panel admin
│   ├── multer.js            # Configuración de Multer
│   ├── sequelize.js         # Configuración de Sequelize
│   ├── relaciones.js        # Asociaciones entre modelos
│   └── app.js               # Punto de entrada del servidor
│
└── client/                  # Frontend estático
    ├── productos/           # Catálogo de productos
    ├── carrito/             # Carrito de compras
    ├── ticket/              # Pantalla de confirmación de compra
    ├── login/               # Login del administrador
    ├── util/                # Utilidades compartidas (theme.js)
    └── images/              # Imágenes estáticas
```

---

## Funcionalidades

**Cliente**
- Catálogo de productos con filtro por categoría (consolas / videojuegos)
- Paginación del catálogo
- Carrito de compras persistente con localStorage
- Ajuste de cantidades y eliminación de productos del carrito
- Modal de confirmación de compra
- Pantalla de ticket post-compra
- Modo claro / oscuro persistente

**Panel de administración**
- Login seguro con contraseña hasheada (bcrypt)
- Dashboard con listado de productos y ventas
- Crear, editar, modificar, activar y desactivar productos
- Subida de imágenes con Multer
- Descarga de ventas en Excel (ExcelJS)

---

## Instalación y uso

### Requisitos
- Node.js
- MySQL

### Pasos

1. Clonar el repositorio:
```
git clone https://github.com/lucianosparta/Ferrandi-Rodriguez-Sparta-TP-Programacion-III-2026-C1.git
```

2. Instalar dependencias del backend:
```
npm install
```

3. Crear el archivo `.env` en la carpeta `server`:
```
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_NAME=frs_gaming
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
```

4. Levantar el servidor:
```
node server/app.js
```

5. Abrir el frontend con Live Server desde `client/bienvenida/index.html`.

---

## Autores

- Franco Ferrandi
- Augusto Rodriguez  
- Luciano Sparta
