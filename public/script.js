//Get html elements
const form = document.getElementById('expenseForm');
const expenseName = document.getElementById('expenseName');
const expenseAmount = document.getElementById('expenseAmount');
const expenseCategory = document.getElementById('expenseCategory');
const btnSubmit = document.getElementById('btnSubmit');

//Helper functions to handle form submissions
//Define Expense class
class Expense {
    constructor(name, amount, category) {
        this.name = name,
        this.amount = amount,
        this.category = category
    }
};
//Create new Expenses
function createNewExpense(expenseName, expenseAmount, expenseCategory) {
    return new Expense(expenseName, expenseAmount, expenseCategory)
}
const expense = new Expense(expenseName, expenseAmount, expenseCategory);

//Event Listener on Form
form.addEventListener('submit', function(event) {
    event.preventDefault();
    const expense1 = new Expense(expenseName, expenseAmount, expenseCategory);
    console.log(expense1);
});