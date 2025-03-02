// Objeto para armazenar os itens por categoria
let shoppingList = {
    frutas: [],
    laticinios: [],
    congelados: [],
    doces: [],
    outros: []
};

// Array para armazenar o histórico de compras
let history = [];

// Função para exibir mensagens
function showMessage(message, isError = true) {
    const messageElement = document.getElementById('message');
    messageElement.textContent = message;
    messageElement.style.color = isError ? "#d9534f" : "#5cb85c"; // Vermelho para erro, verde para sucesso
    setTimeout(() => {
        messageElement.textContent = "";
    }, 3000); // Remove a mensagem após 3 segundos
}

// Função para adicionar um item à lista
function addItem() {
    const item = document.getElementById('item').value.trim();
    const value = parseFloat(document.getElementById('value').value);
    const category = document.getElementById('category').value;

    if (item === "" || isNaN(value) || value <= 0) {
        showMessage("Por favor, preencha o item e o valor corretamente.", true);
        return;
    }

    // Adiciona o item como um objeto { nome, valor }
    shoppingList[category].push({ nome: item, valor: value });
    document.getElementById('item').value = ""; // Limpa o campo de input
    document.getElementById('value').value = ""; // Limpa o campo de valor
    showMessage(`"${item}" foi adicionado à categoria ${category}.`, false);
}

// Função para exibir a lista de compras
function showList() {
    const listContainer = document.getElementById('list-container');
    const listElement = document.getElementById('shopping-list');
    const totalValueElement = document.getElementById('total-value');
    const itemCountElement = document.getElementById('item-count');

    // Limpa a lista antes de exibir
    listElement.innerHTML = "";

    let totalValue = 0; // Variável para armazenar o valor total
    let totalItems = 0; // Variável para armazenar a quantidade total de itens

    // Itera sobre as categorias e adiciona os itens à lista
    for (const category in shoppingList) {
        if (shoppingList[category].length > 0) {
            const categoryItems = shoppingList[category].map(item => `${item.nome} (R$ ${item.valor.toFixed(2)})`).join(', ');
            const listItem = document.createElement('li');
            listItem.textContent = `${category.charAt(0).toUpperCase() + category.slice(1)}: ${categoryItems}`;
            listElement.appendChild(listItem);

            // Soma os valores e a quantidade de itens da categoria
            shoppingList[category].forEach(item => {
                totalValue += item.valor;
                totalItems += 1;
            });
        }
    }

    // Exibe a quantidade de itens e o valor total
    itemCountElement.textContent = `Quantidade de Itens: ${totalItems}`;
    totalValueElement.textContent = `Total da Compra: R$ ${totalValue.toFixed(2)}`;

    // Exibe o container da lista
    listContainer.classList.remove('hidden');
}

// Função para iniciar uma nova lista
function startNewList() {
    shoppingList = {
        frutas: [],
        laticinios: [],
        congelados: [],
        doces: [],
        outros: []
    };
    document.getElementById('list-container').classList.add('hidden');
    showMessage("Nova lista iniciada.", false);
}

// Função para adicionar a lista atual ao histórico
function addToHistory() {
    if (Object.values(shoppingList).some(category => category.length > 0)) {
        history.push({ ...shoppingList });
        updateHistory();
    }
}

// Função para atualizar o histórico de compras
function updateHistory() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = "";

    history.forEach((list, index) => {
        const historyItem = document.createElement('div');
        historyItem.classList.add('history-item');

        const historyTitle = document.createElement('h3');
        historyTitle.textContent = `Lista ${index + 1}`;
        historyItem.appendChild(historyTitle);

        const historyItems = document.createElement('ul');
        for (const category in list) {
            if (list[category].length > 0) {
                const categoryItems = list[category].map(item => `${item.nome} (R$ ${item.valor.toFixed(2)})`).join(', ');
                const categoryElement = document.createElement('li');
                categoryElement.textContent = `${category.charAt(0).toUpperCase() + category.slice(1)}: ${categoryItems}`;
                historyItems.appendChild(categoryElement);
            }
        }
        historyItem.appendChild(historyItems);
        historyList.appendChild(historyItem);
    });

    document.getElementById('history-container').classList.remove('hidden');
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('add-item').addEventListener('click', addItem);
    document.getElementById('show-list').addEventListener('click', () => {
        showList();
        addToHistory();
    });
    document.getElementById('new-list').addEventListener('click', startNewList);

    // Automatizar confirmação com a tecla Enter
    document.getElementById('value').addEventListener('keypress', (e) => {
        if (e.key === "Enter") {
            addItem();
        }
    });
});