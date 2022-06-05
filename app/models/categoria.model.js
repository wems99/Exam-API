const sql = require ("./db");

class Categorias{

    constructor(db_categorias){
        this.FK_id = db_categorias.id,
        this.descripcion = db_categorias.descripcion
    }

}

Categorias.getAll = (descripcion, result) =>{
    let query = "SELECT * FROM categorias";

    if(descripcion){
        query += ` WHERE descripcion LIKE '%${descripcion}%'`;
    }

    sql.query(query, (err, res) => {
        if(err) {
            console.log("error: ",err);
            result(null, err);
            return;
        }

        console.log("categorias: ", res);
        result(null, res);

    })
}

Categorias.findById = (id, result) =>{
    sql.query(`SELECT * FROM categorias WHERE PK_id = ${id}`, (err,res) =>{
        if(err){
            console.log("error", err);
            result(err, null);
            return;
        }

        if(res.length) {
            console.log("categoria encontrado:", res[0]);
            result(null, res[0]);
            return;
        }

        //categoria no encontrado por el id
        result({kind: "not_found" }, null);
    })
}

module.exports = Categorias;