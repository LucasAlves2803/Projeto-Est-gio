const express = require("express");
const path = require('path');
const mongoose = require('mongoose');
const productRoutes = require("./back-end/routes/produtos-rotas"); // Importando o arquivo de rotas
const cors = require('cors');

// require("./back-end/models/produtos");
// const Artigo = mongoose.model('produto');  

// const cors = require("cors");
const bodyParser = require("body-parser");
// const productRoutes = require("./routes/productRoutes");

const app = express();

app.use(cors());

app.use(express.static(path.join(__dirname,'front-end'))); // carrega os arquivos estáticos html,css, js
// faz a conexão com o mongodb
mongoose.connect('mongodb://127.0.0.1/produtos').then(() =>{
    console.log("Conexão com MongoDB realizada com sucesso!");
}).catch((erro)=>{
    console.log("Conexão com MongoDb não foi realizada com sucesso!");
});

// app.post("/produto", (req,res) =>{
//     console.log(req.body);
//     return res.json(req.body);
// })

// app.use(cors());
app.use(bodyParser.json());
// Usar as rotas de produtos
app.use("/api", productRoutes);

app.listen(3000, () => console.log("Server running on port 3000"));
