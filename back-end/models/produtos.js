const mongoose = require('mongoose');

const Produtos = new mongoose.Schema({
    nome : {
        type: String,
        require: true
    },
    descricao: {type: String},
    valor: {
        type: Number
    },
    disponivel: {type: Boolean}

});

// exporta o modelo
mongoose.model('produto', Produtos);