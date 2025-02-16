//Get html elements
const form = document.getElementById('expenseForm');
const expenseDate = document.getElementById('expenseDate');
const expenseName = document.getElementById('expenseName');
const expenseAmount = document.getElementById('expenseAmount');
const expenseCategory = document.getElementById('expenseCategory');
const btnSubmit = document.getElementById('btnSubmit');
const expenseList = document.getElementById('expenseList');

//Create table rows and render them
function createRow(record) {
    //create elements
    const tr = document.createElement('tr');
    const tdDate = document.createElement('td');
    const tdName = document.createElement('td');
    const tdAmount = document.createElement('td');
    const tdCategory = document.createElement('td');
    const tdActions = document.createElement('td');
    //set attributes
    //set text
    tdDate.textContent = record.date;
    tdName.textContent = record.name;
    tdAmount.textContent = record.amount;
    tdCategory.textContent = record.category;
    tdActions.textContent = 'Actions here...';
    //append
    tr.append(tdDate, tdName, tdAmount, tdCategory, tdActions);
    expenseList.append(tr);
}
//Routes Functions
//GET
function getExpenses() {
    fetch('/api/expenses', {method: 'GET'})
    .then(response => {
        if(!response.ok) {throw new Error(`Error: ${response.status}`)};
        return response.json();
    })
    .then(data => {
        console.log(data);
        expenseList.textContent = ''; //clear contents before rendering
        data.forEach(record => {
            createRow(record);
        });
    })
    .catch(error => console.error('Error Occurred:', error));
};
//POST
function postExpense(expense) {
    fetch('/api/expenses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(expense)
    })
    .then(response => {
        if(!response.ok) {throw new Error(`Error: ${response.status}`)};
        return response.json();
    })
    .then(data => {
        console.log(data);
        getExpenses() //get fresh set of data
    })
    .catch(error => console.error('Error Occurred:', error));
};

//Get data and render by default on app start
getExpenses();

//Event Listener on Form
form.addEventListener('submit', function(event) {
    event.preventDefault();
    //create new expense
    const newExpense = {
        date: expenseDate.value,
        name: expenseName.value.trim(),
        amount: expenseAmount.value.trim(),
        category: expenseCategory.value.trim()
    };

    //call post function
    postExpense(newExpense);

    //clear form content
    expenseDate.value = '';
    expenseName.value = '';
    expenseAmount.value = '';
    expenseCategory.value = '';
});