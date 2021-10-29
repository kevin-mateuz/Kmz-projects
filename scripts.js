let input = document.getElementById("input-principal")
let button = document.getElementById("botao-adicionar")
let tarefa = document.getElementById("nome-tarefa-id")
let listaCompleta = document.getElementById("tarefas")

let arrayDeTarefas = []
recarregarTarefas()

//função usada para mostrar a tarefa a qual foi adicionada pelo usuário
function mostrarTarefas() {
    let novaLi = ""

    arrayDeTarefas.forEach((tarefa, index) => {

        novaLi = novaLi + `
        <li class="item-tarefa ${ tarefa.concluida == true ? "concluido" : "" } ">
            <button class="botao-foguete" onclick="concluirTarefa(${index})">
                <i class="fas fa-rocket"></i>
            </button>
            <p class="nome-tarefa ${ tarefa.concluida == true ? "concluido" : "" }" id="nome-tarefa-id">${tarefa.tarefa}</p>
            <button class="botao-delete" onclick="deletarTarefa(${index})">
                <i class="fas fa-trash"></i>
            </button>
        </li>
`
    })

    listaCompleta.innerHTML = novaLi

    localStorage.setItem("lista", JSON.stringify(arrayDeTarefas))
}

//função de delete usada para excluir uma tarefa 
function deletarTarefa(index){
    arrayDeTarefas.splice(index, 1)

    mostrarTarefas()
}
//função usada para adicionar uma tarefa
function adicionarTarefa() {
    if (input.value){
    arrayDeTarefas.push({
        
        tarefa: input.value,
        concluida: false
    })}else{
        alert("Digite uma tarefa")
    }
    input.value=""
    mostrarTarefas()
    
}
//função de check usada para riscar uma tarefa mostrando que ela ja foi concluida pelo usuário
function concluirTarefa(index){
   arrayDeTarefas[index].concluida = !arrayDeTarefas[index].concluida

   mostrarTarefas()
}
//função que mostra as tarefas novamente após o fechamento da página
function recarregarTarefas(){
    let minhasTarefas = localStorage.getItem("lista")
    if (minhasTarefas ){

    

    arrayDeTarefas = JSON.parse(minhasTarefas)

    mostrarTarefas()
    }
}

function adicionarPeloEnter(teclas){
    if(teclas.key === "Enter"){
        adicionarTarefa()
    }
}
//esse trecho é responsável por ouvir ou saber quando o click no botão aconteceu e assim a função de adicionar a tarefa é ativada
button.addEventListener("click", adicionarTarefa)
//o trecho abaixo é usado para adicionara as tarefas pressionando o botão enter de seu teclado 
document.addEventListener("keypress",adicionarPeloEnter)
