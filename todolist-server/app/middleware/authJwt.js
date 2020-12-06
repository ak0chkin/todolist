const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

verifyToken = (request, response, next) => {
    let token = request.headers["x-access-token"];

    if (!token) {
        return response.status(403).send({
            message: "Токен не предоставлен!"
        });
    }

    jwt.verify(token, config.secret, (error, decoded) => {
        if (error) {
            return response.status(401).send({
                message: "Недостаточно прав!"
            });
        }
        request.userId = decoded.id;
        next();
    });
};

const authJwt = {
    verifyToken
};
module.exports = authJwt;