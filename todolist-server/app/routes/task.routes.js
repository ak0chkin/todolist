const controller = require("../controllers/task.controller");

module.exports = function (app) {
    app.use(function (request, response, next) {
        response.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/task/create", controller.create);

    app.put("/api/task/update", controller.update);

    app.get("/api/task/get", controller.get);

    app.get("/api/task/getAll", controller.getAll)
};
