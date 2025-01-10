const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
require("../models/produtos");
const Produto = mongoose.model('produto');  // Produto é a variável que faz a conexão com o banco de dados, a apartir dela é possivel salvar e consultar os dados

// const cors = require("cors");
const bodyParser = require("body-parser");
// const productRoutes = require("./routes/productRoutes");


router.use(bodyParser.json());
router.get("/",(req,res) =>{
    console.log("GET chamado");
    Produto.find({}).then((dados)=>{
        return res.json(dados);
    })
});

router.post("/produto", (req,res) =>{
    const novoProduto = {
        nome: req.body.usernamevalue,
        descricao: req.body.descricaovalue,
        valor: req.body.valorvalue,
        disponivel: req.body.disponivel
    }; // assim os nomes dos campos do formulário e do banco de dados se tornam iguais permitindo a inserção dos dados
    Produto.create(novoProduto);
    console.log(req.body);
    return res.json(req.body);
    //  novoProduto
    //     .save()
    //     .then(() => {
    //         res.status(201).json({ message: "Produto salvo com sucesso!", produto: novoProduto });
    //     })
    //     .catch((erro) => {
    //         res.status(400).json({ error: "Erro ao salvar o produto", details: erro });
    //     });
    // return res.json(req.body);
})

// Exportar o roteador
module.exports = router;