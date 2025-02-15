//Import dependencies
const expensesR = require('express').Router();
const fs = require('fs');

//GET expenses
expensesR.get('/', (req, res) => {
    //read file
    fs.readFile('./db/expenses.json', 'utf8', (err, data) => {
        if(err) {console.error(err)};
        //create in memory array of db
        let expensesDB;
        //try safety check when parsing json
        try {
            expensesDB = JSON.parse(data);
        } catch (error) {
            return res.status(500).json({error: 'Database file is currupt'})
        };

        //respond back to client with database
        res.status(200).json(expensesDB);
    });
});
//POST expense
expensesR.post('/', (req, res) => {
    //read file
    fs.readFile('./db/expenses.json', 'utf8', (err, data) => {
        if(err) {console.error(err)};
        let expensesDB;
        //try safety check when parsing json
        try {
            expensesDB = JSON.parse(data);
        } catch (error) {
            return res.status(500).json({error: 'Database file is currupt'});
        };

        //create new expense object
        const newExpense = {
            id: expensesDB > 0 ? Math.max(...expensesDB.map(expense => expense.id)) + 1 : 1,
            date: req.body.date,
            name: req.body.name,
            amount: req.body.amount,
            category: req.body.category
        };
        //add new expense to array
        expensesDB.push(newExpense);

        //write back to expenses.json with updated data
        fs.writeFile('./db/expenses.json', JSON.stringify(expensesDB, null, 2), (err) => {
            if(err) {console.error(err)};

            //respond back to client
            res.status(201).json({message: 'Expense added'});
        });
    });
});

//Export route
module.exports = expensesR;