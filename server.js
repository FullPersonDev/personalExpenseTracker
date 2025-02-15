//Import dependencies
const express = require('express');
const path = require('path');
//set port
const PORT = 3001;
//create express app
const app = express();

//Import routes hub
const api = require('./routes/index');

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
//use static folder
app.use(express.static('public'));
//use routes hub
app.use('/api', api);

//Send homepage html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

//Start app
app.listen(PORT, () => {
    console.log(`Now listening at http://localhost:${PORT}`);
});