module.exports = app => {
  
    const categorias = require("../controllers/categoria.controller.js");
    var router = require("express").Router();

   

   router.get("/", categorias.findAll);

   router.get("/:id", categorias.findOne);

    
    app.use('/api/categorias', router);

}