const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Task = db.task;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (request, response) => {
    try {
        const result = await db.sequelize.transaction(async (transaction) => {
            const user = await User.create({
                    surname: request.body.surname,
                    name: request.body.name,
                    patronymic: request.body.patronymic,
                    username: request.body.username,
                    password: bcrypt.hashSync(request.body.password, 8),
                    headId: request.body.head
                },
                {transaction});
            return user;
        });
        response.status(200).send({message: "Пользователь успешно зарегистрирован!", result})
    } catch (error) {
        response.status(500).send({message: error.message});
    }
};

exports.signin = async (request, response) => {
    try {
        const result = await db.sequelize.transaction(async (transaction) => {
            const user = await User.findOne({
                where: {
                    username: request.body.username
                }
            });
            return user;
        });
        if (!result) {
            return response.status(404).send({message: "Пользователь не найден."});
        }
        const passwordIsValid = bcrypt.compareSync(
            request.body.password,
            result.password
        );

        if (!passwordIsValid) {
            return response.status(401).send({
                accessToken: null,
                message: "Неправильный пароль!"
            });
        }

        const token = jwt.sign({id: result.id}, config.secret, {
            expiresIn: 86400 // 24 hours
        });
        response.status(200).send({
            ...result.dataValues,
            accessToken: token
        });
    } catch (error) {
        response.status(500).send({message: error.message});
    }
};
