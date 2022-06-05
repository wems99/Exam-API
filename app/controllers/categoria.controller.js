const Categorias = require("../models/categoria.model.js");


//recupera todas las categorias del DB 
exports.findAll = (req, res) =>{

    const descripcion = req.query.descripcion;

    Categorias.getAll(descripcion, (err, data) =>{
        if(err)
            res.status(500).send({
                message: err.message || "ocurrio algun error al momento de recuperar la categoria"
            })
            else res.send(data);
    }
    )
};

exports.findOne = (req, res) =>{
    Categorias.findById (req.params.id, (err, data) =>{
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `No se se encontro una categoria con el id ${req.params.id}.`
                })
            } else{
                res.status(500).send({
                    message: "error recuperando categorias con el id " + req.params.id
                })
            }
        } else res.send(data);
    })

};