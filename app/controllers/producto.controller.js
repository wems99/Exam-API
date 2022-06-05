const Producto = require("../models/producto.model.js");

//creacion  y guardado de un nuevo producto
exports.create = (req, res) => {

    if(!req.body){
        res.status(422).send({
            message: "el contenido no puede estar vacio"
        });
    }

    const producto = new Producto({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        url_img: req.body.url_img,
        precio: req.body.precio,
        cant_inventario: req.body.cant_inventario
    })

    Producto.create(producto, (err, data) =>{
        if(err)
            res.status(500).send({
                message: err.message || "algun error ocurrio mientras se creaban el producto"
            })
        else res.send(data);
    })

};

//recupera todos los productos del DB 
exports.findAll = (req, res) =>{

    const nombre = req.query.nombre;

    Producto.getAll(nombre, (err, data) =>{
        if(err)
            res.status(500).send({
                message: err.message || "ocurrio algun error al momento de recuperar el producto"
            })
            else res.send(data);
    }
    )
};

//encuentra un producto segun id
exports.findOne = (req, res) =>{
    Producto.findById (req.params.id, (err, data) =>{
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `No se se encontro un producto con el id ${req.params.id}.`
                })
            } else{
                res.status(500).send({
                    message: "error recuperando producto con el id " + req.params.id
                })
            }
        } else res.send(data);
    })

};

//actualiza un producto segun el id del request
exports.update = (req, res) =>{

    if(!req.body){
        res.status(400).send({
            message: "el contenido no puede estar vacio"
        })
    }

    console.log(req.body);

    Producto.updateById(
        req.params.id,
        new Producto(req.body),
        (err, data) =>{
            if(err){
                if(err.kind === "not_found"){
                    res.status(404).send({
                        message: `Nose se encontro un producto con el id ${req.params.id}.`
                    })
                } else{
                    res.status(500).send({
                        message: "error actualizando producto con el id " + req.params.id
                    })
                }
            } else res.send(data);
        }
    )

}

//elimina un producto en especifico segun id
exports.delete = (req, res) =>{

    Producto.remove(req.params.id, (err, data) =>{
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `No se se encontro un producto con el id ${req.params.id}.`
                })
            } else {
                res.status(500).send({
                    message: "no se puedo eleminiar el producto con el id: " + req.params.id
                })
            }
        } else res.send({message: `producto eliminado con exitoxamente!` });
    })
}

exports.updateOne = (req, res) =>{

    //reestructuracion
    const {id} = req.params;
    const {operation, cantidad} = req.body;

    if(!req.body){
        res.status(422).send({
            message: "el contenido no puede estar vacio"
        })
    }

    console.log(req.body);

    Producto.updateByOperation(
        id, operation, cantidad,
        (err, data) =>{
            if(err){
                if(err.kind === "not_found"){
                    res.status(404).send({
                        message: `Nose se encontro un producto con el id ${id}.`
                    })
                } else{
                    res.status(500).send({
                        message: "error actualizando producto con el id " + id
                    })
                }
            } else res.send(data);
        }
    )

}