const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");

db.sequelize.sync({force: true}).then(() => {
    initial();
});

app.get("/", (request, response) => {
    response.json({ message: "Welcome to kochkin-todolist application." });
});

require('./app/routes/auth.routes')(app);
require('./app/routes/board.routes')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

function initial() {

}