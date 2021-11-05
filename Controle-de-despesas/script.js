const transactionsUl = document.querySelector('#transactions');// id da lista nao ordenada no html
const incomeDisplay = document.querySelector('#money-plus');// id de receitas
const expenseDisplay = document.querySelector('#money-minus');// id de despesas
const balanceDisplay = document.querySelector('#balance');// id de totalizador
const nameDisplay = document.querySelector('#name');// id de name
const amountDisplay = document.querySelector('#amount');// id de amount

// objeto literal
const dummyTransactions = [
    { id: 1, name: 'Bolo de brigadeiro', amount: -20 },
    { id: 2, name: 'Salario', amount: 300 },
    { id: 3, name: 'Torta de frango', amount: -10 },
    { id: 4, name: 'Violão', amount: 150 }
]

// funcao para adicionar os itens na lista 
const addTransactionsIntoDOM = transaction =>{
    const operator = transaction.amount < 0 ? '-' : '+';// IF TERNARIO para saber se é despesa ou receita
    const amountWithoutOperator = Math.abs(transaction.amount);
    const li = document.createElement('li'); // criado o elemento de item de lista 'li'
    
    //aqui eu escreveo dentro do elemente criado na linha anterior
    li.innerHTML = 
    `${transaction.name} <span>${operator} R$ ${amountWithoutOperator} </span><button class="delete-btn">x</button> `

    transactionsUl.append(li);
}


/**
 * Metodo que irá retonar todo os valores somando as receitas e despesas
 */

const updateBalanceValues = () =>{
    // retornar somente a propriedade amount de cada linha do objetio 
    const transactionsAmounts = dummyTransactions.map(transaction => transaction.amount);
    
    // retorna os totalizador
    const total = transactionsAmounts
                    .reduce((accumulator, transaction) => accumulator + transaction, 0)
                    .toFixed(2);  
    
    //  retornar somente as receitas
    const income = transactionsAmounts
                    .filter(value => value > 0)
                    .reduce((accumulator, transaction) => accumulator + transaction, 0)
                    .toFixed(2); 


    //  retornar somente as despesas
    const expense = transactionsAmounts
        .filter(value => value < 0)
        .reduce((accumulator, transaction) => accumulator + transaction, 0)
        .toFixed(2); 

    balanceDisplay.textContent =`R$ ${total}`; 
    incomeDisplay.textContent = `R$ ${income}`;
    expenseDisplay.textContent = `R$ ${expense}`;

}

// construir uma funcao de inicializacao executavel
const init = () =>{
    transactionsUl.innerHTML = '';
    dummyTransactions.forEach(addTransactionsIntoDOM);
    updateBalanceValues();
}

// executo a funcao de inicializacao
init();

// gerador de id random
const generateId = () => Math.round(Math.random() * 1000);

/**
 * Adicionar um evento de ouvinte(listener) no submit
 */
 formulario.addEventListener('submit', event =>{
    // diz que nao irá ser feito o submit para alguma lugar e será tratado aqui mesmo
    event.preventDefault();
    const transactionName  =nameDisplay.value.trim();
    const transactionAmount = amountDisplay.value.trim();
    
    if(transactionName === '' ||transactionAmount === ''){
        alert('Informe o nome da transação e o valor');
        return;
    }

    const newTransaction = { id: generateId(), name: transactionName, amount: transactionAmount };
    
    dummyTransactions.push(newTransaction);

    init();

    transactionName.value = '';
    transactionAmount.value = '';
 })

