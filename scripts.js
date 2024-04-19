/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/

const getList = async () => {
  let url = 'http://192.168.0.40:5000/atividades_all'; // Corrigindo o URL da rota
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.forEach(item => insertList(item.tarefa, item.colaborador, item.status)); // Ajustando para acessar diretamente os dados retornados
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/
getList()


/*
  --------------------------------------------------------------------------------------
  Função para colocar um item na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postItem = async (inputTarefa, inputColaborador, inputStatus) => {
  const formData = new FormData();
  formData.append('tarefa', inputTarefa);
  formData.append('colaborador', inputColaborador);
  formData.append('status', inputStatus);

  let url = 'http:/192.168.0.40:5000/atividade';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}


/*
  --------------------------------------------------------------------------------------
  Função para criar um botão close para cada item da lista
  --------------------------------------------------------------------------------------
*/
const insertButton = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  parent.appendChild(span);
}


/*
  --------------------------------------------------------------------------------------
  Função para remover um item da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
const removeElement = () => {
  let close = document.getElementsByClassName("close");
  // var table = document.getElementById('myTable');
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const nomeItem = div.getElementsByTagName('td')[0].innerHTML
      if (confirm("Você tem certeza?")) {
        div.remove()
        deleteItem(nomeItem)
        alert("Removido!")
      }
    }
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para deletar um item da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteItem = (item) => {
  console.log(item)
  let url = 'http:/192.168.0.40:5000/atividades?tarefa=' + item;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para adicionar um novo item com nome, quantidade e valor 
  --------------------------------------------------------------------------------------
*/
const newItem = () => {
  let inputTarefa = document.getElementById("newTarefa").value;
  let inputColaborador = document.getElementById("newColaborador").value;
  let inputStatus = document.getElementById("newStatus").value;

  if (inputTarefa === '') {
    alert("Escreva o nome de um item!");
  }
  //  else if (isNaN(inputColaborador) || isNaN(inputStatus)) {
  //   alert("Quantidade e valor precisam ser números!");
  // } 
  else {
    insertList(inputTarefa, inputColaborador, inputStatus)
    postItem(inputTarefa, inputColaborador, inputStatus)
    alert("Item adicionado!")
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para inserir items na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertList = (tarefa, colaborador, status) => {
  var item = [tarefa, colaborador, status]
  var table = document.getElementById('myTable');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
  insertButton(row.insertCell(-1))
  document.getElementById("newTarefa").value = "";
  document.getElementById("newColaborador").value = "";
  document.getElementById("newStatus").value = "";

  removeElement()
}

