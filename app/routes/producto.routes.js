module.exports = app => {
    const productos = require("../controllers/producto.controller.js");
    var router = require("express").Router();

    //crear un nuevo producto
    router.post("/", productos.create);

    //recuperar todos los productos
    router.get("/", productos.findAll);

    // recuperar un producto segun id
    router.get("/:id", productos.findOne);

    // actulizar un producto segun id
    router.put("/:id", productos.update);

    //eliminar un producto segun id
    router.delete("/:id", productos.delete);

    router.patch("/:id", productos.updateOne);

    app.use('/api/productos', router);
  

}