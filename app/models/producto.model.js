
const sql = require ("./db");

//constructor

class Productos { 

    constructor (db_productos){
        this.nombre = db_productos.nombre;
        this.descripcion = db_productos.descripcion;
        this.url_img = db_productos.url_img;
        this.precio = db_productos.precio;
        this.cant_inventario = db_productos.cant_inventario;
    }
    
}

Productos.create = (newProducto, result) =>{
    sql.query("INSERT INTO productos SET ?", newProducto, (err, res) =>{
        if(err){
            console.log("error", err);
            result(err, null);
            return;
        }

        console.log("productos creados: ", {id: res.insertId, ...newProducto});
        result(null, {id: res.insertId, ...newProducto});
    })
}

Productos.findById = (id, result) =>{
    sql.query(`SELECT * FROM productos WHERE PK_id = ${id}`, (err,res) =>{
        if(err){
            console.log("error", err);
            result(err, null);
            return;
        }

        if(res.length) {
            console.log("producto encontrado:", res[0]);
            result(null, res[0]);
            return;
        }

        //producto no encontrado por el id
        result({kind: "not_found" }, null);
    })
}


Productos.updateById = (id, producto, result) =>{
    sql.query("UPDATE productos SET nombre = ?, descripcion = ?, url_img = ?, precio = ?, cant_inventario = ? WHERE PK_id = ?",
    [producto.nombre, producto.descripcion, producto.url_img, producto.precio, producto.cant_inventario, id],
    (err, res) => {
        if(err){
            console.log("error", err);
            result(null, err);
            return;
        }

        if(res.affectedRows == 0){
            //no se encontro producto con el id
            result({kind: "not_found"}, null);
            return;
        }

        console.log("producto actualizado:", {id: id, ...producto});
        result(null, {id: id, ...producto});
    })
}

Productos.getAll = (nombre, result) =>{
    let query = "SELECT * FROM productos";

    if(nombre){
        query += ` WHERE nombre LIKE '%${nombre}%'`;
    }

    sql.query(query, (err, res) => {
        if(err) {
            console.log("error: ",err);
            result(null, err);
            return;
        }

        console.log("productos: ", res);
        result(null, res);

    })
}

Productos.remove = (id, result) =>{
    sql.query("DELETE FROM productos WHERE PK_id = ?", id, (err,res) => {
        if(err){
            console.log("error", err);
            result(null, err);
            return;
        }

        if(res.affectedRows == 0){
            //no se encontro producto con el id por parametro
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("producto eliminado con el id: ", id);
        result(null, res);
    })
}

Productos.updateByOperation = (id, operation, cant, result) =>{

    let query = "";

    if (operation === "agregar"){
        query = `UPDATE productos SET cant_inventario = cant_inventario + ${cant} WHERE PK_id = ${id}`;
    }

    if(operation === "modificar"){
        query = `UPDATE productos SET cant_inventario = ${cant} WHERE PK_id = ${id}`;
    }

    if(operation === "restar"){
        query = `UPDATE productos SET cant_inventario = cant_inventario - ${cant} WHERE PK_id = ${id}`;
    }

    sql.query(query,
    (err, res) => {

        if(err){
            console.log("error", err);
            result(null, err);
            return;
        }

        if(res.affectedRows == 0){
            //no se encontro producto con el id
            result({kind: "not_found"}, null);
            return;
        }
        console.log("producto actualizado:", {id: id, ...res});
        result(null, {id: id, ...res});
    })


}


module.exports = Productos;