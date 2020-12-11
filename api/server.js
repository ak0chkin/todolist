const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, '../client/build')));

require('./app/routes/auth.routes')(app);
require('./app/routes/board.routes')(app);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.get('/home/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.get('/login/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.get('/register/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.get('/profile/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.get('/board/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});


const db = require("./app/config/db.config");

db.sequelize.sync().then(() => {
    initial();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(Server is running on port ${PORT}.);
});

function initial() {

}