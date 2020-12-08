const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (request, response) => {
    try {
        await db.sequelize.transaction(async (transaction) => {
            const head = await User.findOne({
                where: {
                    username: request.body.head ? request.body.head : null
                },
                transaction
            });
            if (!head && request.body.head) {
                response.status(404);
                throw new Error("Руководитель не найден.");
            }
            return await User.create({
                    surname: request.body.surname,
                    name: request.body.name,
                    patronymic: request.body.patronymic,
                    username: request.body.username,
                    password: bcrypt.hashSync(request.body.password, 8),
                    headId: head ? head.id : null
                },
                {transaction});
        });
        response.status(200).send({message: "Пользователь успешно зарегистрирован!"})
    } catch (error) {
        if (response.statusCode === 200) {
            response.status(500);
        }
        response.send({message: error.message});
    }
};

exports.signin = async (request, response) => {
    try {
        const result = await db.sequelize.transaction(async (transaction) => {
            return await User.findOne({
                where: {
                    username: request.body.username
                },
                transaction
            });
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
            expiresIn: 86400
        });
        response.status(200).send({
            id: result.dataValues.id,
            username: result.dataValues.username,
            surname: result.dataValues.surname,
            name: result.dataValues.name,
            headId: result.dataValues.headId,
            accessToken: token
        });
    } catch (error) {
        response.status(500).send({message: error.message});
    }
};
