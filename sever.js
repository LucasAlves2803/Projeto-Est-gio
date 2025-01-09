const express = require("express");
const path = require('path');
const mongoose = require('mongoose');

// const cors = require("cors");
const bodyParser = require("body-parser");
// const productRoutes = require("./routes/productRoutes");

const app = express();

app.use(express.static(path.join(__dirname,'front-end'))); // carrega os arquivos estáticos html,css, js

mongoose.connect('mongodb://127.0.0.1/produtos').then(() =>{
    console.log("Conexão com MongoDB realizada com sucesso!");
}).catch((erro)=>{
    console.log("Conexão com MongoDb não foi realizada com sucesso!");
});

// app.use(cors());
app.use(bodyParser.json());
// app.use("/api", productRoutes);

app.listen(3000, () => console.log("Server running on port 3000"));
