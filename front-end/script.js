const form = document.getElementById("form");
const username = document.getElementById("username");
const descricao = document.getElementById("descricao");
const valor = document.getElementById("valor");
const sim = document.getElementById("sim");
const nao = document.getElementById("nao");
const opcoes = document.getElementById('opcoes');

form.addEventListener('submit', (e) =>{
    e.preventDefault();
    checkInputs();
})

async function checkInputs() {
    const usernamevalue = username.value.trim();
    const descricaovalue = descricao.value.trim();
    const valorvalue = valor.value.trim();
    const disponivel = true;
    

    // Verificação do campo username
    if (usernamevalue === "") {
        Erro(username, "Faltou o nome do produto");
    } else {
        Acerto(username);
    }

    // Verificação do campo descricao
    if (descricaovalue === "") {
        Erro(descricao, "Faltou a descrição do produto");
    } else {
        Acerto(descricao);
    }

    // Verificação do campo valor
    if (valorvalue === "") {
        Erro(valor, "Digite o valor do produto");
    } else {
        Acerto(valor);
    }

    // Verificação se nenhuma opção foi marcada
    if (!sim.checked && !nao.checked) {
        Erro(opcoes, "Faltou marcar uma opção");
       // console.log(opcoes);
    } else {
        Acerto(opcoes); // A mensagem de sucesso será aplicada a uma das opções
    }

    const produto = {
        usernamevalue,
        descricaovalue,
        valorvalue,
        disponivel
    };


    try {
        // Enviar os dados para o servidor
        const response = await fetch("http://localhost:3000/api/produto", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(produto)
        });
        console.log("dfs " + response);

        // Processar a resposta
        const data = await response.json();
        if (response.ok) {
            document.getElementById("response").innerHTML = `
                <p>Produto cadastrado com sucesso:</p>
            `;
            carregarListagem();
        } else {
            document.getElementById("response").innerHTML = `
                <p>Erro ao cadastrar o produto:</p>
                <pre>${JSON.stringify(data, null, 2)}</pre>
            `;
        }
    } catch (error) {
        console.error("Erro ao fazer a requisição:", error);
        document.getElementById("response").innerHTML = `
            <p>Erro na requisição: ${error.message}</p>
        `;
    }


}

async function carregarListagem(){
    // requisição GET É MÉTODO DEFAULT (PADRÃO) NÃO PRECISA SER DECLARADO
    try {
        const response = await fetch("http://localhost:3000/api/");
        const data = await response.json(); // Isso processa o corpo da resposta como JSON
        console.log("Dados recebidos:", data); // Aqui você verá os produtos no console
        const listagem = document.getElementById("listagem");
        listagem.innerHTML = "";
        data.forEach(dado => {
            console.log("Elemento da lista:", dado.nome);    
            listagem.innerHTML += `
                <div class="dados">
                    <h2>${dado.nome}</h2>
                    <h2>${dado.valor}</h2>
                    
                </div>
            `;	
        });
        
    } catch (error) {
        console.error("Erro ao fazer a requisição GET:", error);
        document.getElementById("response").innerHTML = `
            <p>Erro na requisição get: ${error.message}</p>
        `;
    }
}

function toggleCheckbox(current, other) {
    const currentCheckbox = document.getElementById(current);
    const otherCheckbox = document.getElementById(other);

    if (currentCheckbox.checked) {
        otherCheckbox.checked = false; // Desmarca o outro checkbox
    }
}

function Erro(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector("small");
    // adiciona o design do erro
    formControl.className = "form-control error";
    // adiciona a mensagem de erro
    small.innerText = message;
}

function Acerto(input) {
    const formControl = input.parentElement;
    const small = formControl.querySelector("small");
    formControl.className = "form-control success";
    small.innerText = ""; // Limpa a mensagem de erro
}
