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
    -usuario (varchar)
    -email (varchar unique)
    -password (varchar) -> hashear
    -createdAt (datetime)