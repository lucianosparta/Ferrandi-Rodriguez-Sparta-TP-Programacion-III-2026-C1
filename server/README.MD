ESTRUCTURA PENSADA PARA LA BASE DE DATOS:

1) PRODUCTOS:
    -id (pk int)
    -nombre (varchar)
    -descripcion detallada (varchar) opcional
    -categoria (enum de "consola" y "videojuego")
    -precio (float)
    -stock (int)
    -imagen(varchar -> url si es que usamos o si vamos a almacenar)

2) USUARIOS: 
    -ID (int pk)
    -nombre (varchar)
    -apellido (varchar)
    -usuario (varchar unique)
    -email (varchar unique)
    -password (varchar) -> hashear

3) VENTAS: 
    -id (int pk)
    -usuario (string)
    -total

4) DETALLE_VENTA:
    -id (int pk)
    -venta_id (int fk)
    -producto_id (int fk)
    -cantidad (int)
    -precio_unitario (float)
    -subtotal (float)