//Get html elements
const form = document.getElementById('expenseForm');
const expenseDate = document.getElementById('expenseDate');
const expenseName = document.getElementById('expenseName');
const expenseAmount = document.getElementById('expenseAmount');
const expenseCategory = document.getElementById('expenseCategory');
const btnSubmit = document.getElementById('btnSubmit');
const expenseList = document.getElementById('expenseList');

//today's date helper function
const today = () => {
    const [month, day, year] = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).split('/');
    return `${year}-${month}-${day}`;
};
//set expense date to today date by default
expenseDate.value = today();

//Herper function to show toast notifications
function showToast(message, type = 'success') {
    const toastElement = document.getElementById('toastMessage');
    const toastBody = toastElement.querySelector('.toast-body');

    // Update message text
    toastBody.textContent = message;

    // Set background color based on type (success, error, warning)
    toastElement.classList.remove('bg-success', 'bg-danger', 'bg-warning');
    if (type === 'success') {
        toastElement.classList.add('bg-success');
    } else if (type === 'error') {
        toastElement.classList.add('bg-danger');
    } else if (type === 'warning') {
        toastElement.classList.add('bg-warning');
    }

    // Show toast using Bootstrap's JS API
    const toast = new bootstrap.Toast(toastElement);
    toast.show();
}

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
        showToast(data.message);
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

    //reset form content
    expenseDate.value = '';
    expenseName.value = '';
    expenseAmount.value = '';
    expenseCategory.value = 'Category';
});