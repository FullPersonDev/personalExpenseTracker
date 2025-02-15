//Import dependencies
const express = require('express');
const path = require('path');
const { ppid } = require('process');
//set port
const PORT = 3001;
//create express app
const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
//use static folder
app.use(express.static('public'));

//Send homepage html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

//Start app
app.listen(PORT, () => {
    console.log(`Now listening at http://localhost:${PORT}`);
});