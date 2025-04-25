let botao = document.querySelector('.botaoADD');

// Adiciona evento de clique ao botão
botao.addEventListener('click', function() {
    let input = document.querySelector('.tarefaInput');
    let valorInput = input.value;
    let lista = document.querySelector('#todo-list');

    if (valorInput !== '') {
        // Cria o item da lista
        let li = document.createElement('li');
        li.textContent = valorInput;
        lista.appendChild(li);
        
        // Adiciona botão de remover
        let botaoRemover = document.createElement('button');
        botaoRemover.textContent = '❌';
        botaoRemover.classList.add('botaoRemover');
        li.appendChild(botaoRemover);

        botaoRemover.addEventListener('click', function() {
            lista.removeChild(li);
            salvarTarefas();
        });

        // Adiciona botão de concluído
        let botaoConcluido = document.createElement('button');
        botaoConcluido.textContent = '✅';
        botaoConcluido.classList.add('botaoConcluido');
        li.appendChild(botaoConcluido);

        botaoConcluido.addEventListener('click', function() {
            li.classList.toggle('concluida');
            salvarTarefas(); 
        });

        // Adiciona botão de editar
        let botaoEdit = document.createElement('button');
        botaoEdit.textContent = '✏️';
        botaoEdit.classList.add('botaoEdit');
        li.appendChild(botaoEdit);

        botaoEdit.addEventListener('click', function() {
            let novoValor = prompt('Edite sua tarefa:', valorInput);
            if (novoValor !== null && novoValor !== '') {
                li.firstChild.textContent = novoValor;
                salvarTarefas();  
            }
        });
      
        input.value = '';
        salvarTarefas(); 
    } else {
      
    }
});

function salvarTarefas() {
    let tarefas = [];
    let listaItens = document.querySelectorAll('#todo-list li');

    listaItens.forEach(function(item) {
        tarefas.push({
            texto: item.firstChild.textContent,
            concluida: item.classList.contains('concluida')
        });
    });

    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function carregarTarefas() {
    let tarefasSalvas = JSON.parse(localStorage.getItem('tarefas'));

    if (tarefasSalvas) {
        tarefasSalvas.forEach(function(tarefa) {
            let li = document.createElement('li');
            li.textContent = tarefa.texto;

            if (tarefa.concluida) {
                li.classList.add('concluida');
            }

            let botaoRemover = document.createElement('button');
            botaoRemover.textContent = '❌';
            botaoRemover.classList.add('botaoRemover');
            li.appendChild(botaoRemover);

            botaoRemover.addEventListener('click', function() {
                li.remove();
                salvarTarefas();
            });

            let botaoConcluido = document.createElement('button');
            botaoConcluido.textContent = '✅';
            botaoConcluido.classList.add('botaoConcluido');
            li.appendChild(botaoConcluido);

            botaoConcluido.addEventListener('click', function() {
                li.classList.toggle('concluida');
                salvarTarefas(); 
            });

            let botaoEdit = document.createElement('button');
            botaoEdit.textContent = '✏️';
            botaoEdit.classList.add('botaoEdit');
            li.appendChild(botaoEdit);

            botaoEdit.addEventListener('click', function() {
                let novoValor = prompt('Edite sua tarefa:', li.firstChild.textContent);
                if (novoValor !== null && novoValor !== '') {
                    li.firstChild.textContent = novoValor;
                    salvarTarefas();  
                }
            });

            document.querySelector('#todo-list').appendChild(li);
        });
    }
}

window.onload = carregarTarefas;
