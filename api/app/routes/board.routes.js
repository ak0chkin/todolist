const authJwt = require("../middleware/authJwt");
const controller = require("../controllers/board.controller");

module.exports = function (app) {
    app.use(function (request, response, next) {
        response.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/board/task",
        [authJwt.verifyToken],
        controller.createTask);

    app.put(
        "/api/board/task/:id",
        [authJwt.verifyToken],
        controller.updateTask);

    app.get(
        "/api/board/task/:id",
        [authJwt.verifyToken],
        controller.getTask);

    app.get(
        "/api/board",
        [authJwt.verifyToken],
        controller.getBoard);
};
