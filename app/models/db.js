const mysql = require('mysql');
const dbConfg = require("../config/db.config.js")

const connection = mysql.createConnection({
    host: dbConfg.HOST,
    user: dbConfg.USER,
    password: dbConfg.PASSWORD,
    database: dbConfg.DB
});

connection.connect(error =>{
    if(error) throw error;
    console.log("conexion exitosa con la base de datos");
});

module.exports = connection;