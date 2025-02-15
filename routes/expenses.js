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
            res.status(500).json({error: 'Database file is currupt'})
        };

        //respond back to client with database
        res.status(200).json(expensesDB);
    });
});

//Export route
module.exports = expensesR;