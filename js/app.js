'use strict'

import{openModal, closeModal} from"./modal.js"
import{readClients, createClient, deleteClient} from './clients.js'

const creatRow = (client) => {
    const row = document.createElement('tr')
    row.innerHTML = `
        <td>${client.nome}</td>
        <td>${client.email}</td>
        <td>${client.celular}</td>
        <td>${client.cidade}</td>
        <td>
            <button type="button" class="button green" id="editar-${client.id}" >editar</button>
            <button type="button" class="button red" id="excluir-${client.id}" >excluir</button>
        </td>
    `
    return row
}

const updateTable = async() => {
    const clientsContainer = document.getElementById('clients-container')
    //Ler a API e armazenar o resultado em uma variavel
    const clients = await readClients()

    //Preencher a tabela com as informações
    const rows = clients.map(creatRow)
    clientsContainer.replaceChildren(...rows)
}

const saveClient = () => {
    //Criar um json com as informações do cliente
    const costumers = {
        "id": "",
        "nome": document.getElementById('nome').value,
        "email": document.getElementById('email').value,
        "celular":document.getElementById('celular').value,
        "cidade": document.getElementById('cidade').value
    }
    //Enviar o json para o Servidor API
    createClient(costumers)

    //Fechar model
    closeModal()

    //Atualizar a tabela
    updateTable()
}

const actionClient  = asnyc (event) => {
    if(event.target.type == 'button'){

        const [action, codigo] = event.target.id.split('-')

        if(action[0] == 'editar'){
            //função para editar o cliente
        console.log('editar')
        }else if (action[0] == 'excluir'){
            updateTable()
        }
    }

}

updateTable()

//Eventos
document.getElementById('cadastrarCliente').addEventListener('click', openModal)
document.getElementById('salvar').addEventListener('click', saveClient)
document.getElementById('clients-container').addEventListener('click', action)