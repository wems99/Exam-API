ALTER TABLE mydb.productos auto_increment = 1;
ALTER TABLE mydb.categorias auto_increment = 1;
INSERT INTO mydb.productos (nombre, descripcion, url_img, precio, cant_inventario) values ("IT", "es mejor la antigua", "https://pics.filmaffinity.com/It_Eso_TV-199479174-large.jpg", 10000, 3),
("back to the future", "tremenda trilogia", "https://m.media-amazon.com/images/I/71BPuv+iRbL._AC_SY741_.jpg", 80000, 29),
("El viaje de chihiro", "Best anime pelicula", "https://educayaprende.com/wp-content/uploads/2014/06/46557548899557548899.jpg", 30000, 31),
("El laberinto del fauno", "top 5 peliculas Guillermo del toro", "https://pics.filmaffinity.com/El_laberinto_del_fauno-985415492-large.jpg", 40000, 21),
("WALL-E", "Nosotros en 50 annos la pelicula", "https://static.wikia.nocookie.net/doblaje/images/5/55/Walle-poster.jpg/revision/latest?cb=20201004143700&path-prefix=es", 21000, 7),
("El origen", "nadie la entendio pero dicen que si para verse intelectuales", "https://m.media-amazon.com/images/I/51TfUWh5N9L._SY445_.jpg", 50000, 71);
INSERT INTO mydb.categorias (productos_Pk_id, descripcion) values (1, "terror"), (2, "accion"), (3, "fantasia"), (4, "drama"), (5, "ciencia ficcion"), (6, "aventura");