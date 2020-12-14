const controller = require("../controllers/board.controller");
const authJwt = require("../middleware/authJwt");

module.exports = function (app) {
    app.use(function (request, response, next) {
        response.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/board/createTask", [authJwt.verifyToken], controller.createTask);

    app.put("/api/board/updateTask", [authJwt.verifyToken], controller.updateTask);

    app.get("/api/board/getTask", [authJwt.verifyToken], controller.getTask);

    app.get("/api/board/getBoard", [authJwt.verifyToken], controller.getBoard)
};
