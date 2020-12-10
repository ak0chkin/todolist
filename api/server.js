const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../client/build')));

app.get('*', (req, res) => {  res.sendFile(path.join(__dirname, '../client/build/index.html'));});

const db = require("./app/models");

db.sequelize.sync().then(() => {
    initial();
});

app.get("/", (request, response) => {
    response.json({ message: "Welcome to kochkin-todolist application." });
});

require('./app/routes/auth.routes')(app);
require('./app/routes/board.routes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

function initial() {

}