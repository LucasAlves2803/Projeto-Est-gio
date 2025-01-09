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

function checkInputs() {
    const usernamevalue = username.value.trim();
    const descricaovalue = descricao.value.trim();
    const valorvalue = valor.value.trim();
    

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
