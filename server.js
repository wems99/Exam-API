const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parseo de peticiones con contenido tipo application/json
app.use(express.json());

//parseo de peticiones con contenido tipo application/x-www-form-urlencoded
//buena practica segun documentacion de express
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to tellen's application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
require("./app/routes/producto.routes.js")(app);
require("./app/routes/categoria.routes.js")(app);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});