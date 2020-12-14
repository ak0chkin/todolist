const db = require("../config/db.config");
const User = db.user;

checkDuplicateUsername = (request, response, next) => {
    // Username
    User.findOne({
        where: {
            username: request.body.username
        }
    }).then(user => {
        if (user) {
            response.status(400).send({
                message: "Не удалось! Имя пользователя уже используется!"
            });
            return;
        }

        next();
    });
};

const verifySignUp = {
    checkDuplicateUsername
};

module.exports = verifySignUp;