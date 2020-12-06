const db = require("../models");
const User = db.user;
const Task = db.task;
const Sequelize = db.Sequelize;

exports.create = async (request, response) => {
    try {
        const result = await db.sequelize.transaction(async (transaction) => {
            const creator = await User.findOne({
                where: {
                    id: request.body.creatorId
                },
                transaction
            });
            if (!creator) {
                response.status(404);
                throw new Error("Создатель не найден")
            }
            const responsible = await User.findOne({
                where: {
                    id: request.body.responsibleId
                },
                transaction
            });
            if (!responsible) {
                response.status(404);
                throw new Error("Ответственный не найден")
            }
            return await Task.create({
                    title: request.body.title,
                    description: request.body.description,
                    expiresAt: request.body.expiresAt,
                    priority: request.body.priority,
                    status: 0,
                    creatorId: creator.id,
                    responsibleId: responsible.id
                },
                {transaction});
        });
        response.status(200).send({message: "Задача успешно создана!", result});
    } catch (error) {
        if (response.status === 200) {
            response.status(500);
        }
        response.send({message: error.message});
    }
}

exports.update = async (request, response) => {
    try {
        const result = await db.sequelize.transaction(async (transaction) => {
            const task = await Task.findOne({
                where: {
                    id: request.query.id
                },
                transaction
            })
            if (!task) {
                response.status(404);
                throw new Error("Задача не найдена.");
            }
            await task.update({
                    title: request.body.title,
                    description: request.body.description,
                    expiresAt: request.body.expiresAt,
                    priority: request.body.priority,
                    status: request.body.status,
                    responsibleId: request.body.responsibleId
                },
                {
                    transaction
                });
            return task;
        });
        response.status(200).send({message: "Задача успешно обновлена!"});
    } catch (error) {
        if (response.status === 200) {
            response.status(500);
        }
        response.send({message: error.message});
    }
}

exports.get = async (request, response) => {
    try {
        const result = await db.sequelize.transaction(async (transaction) => {
            const task = await Task.findOne({
                where: {
                    id: request.query.id
                },
                transaction
            });
            if (!task) {
                response.status(404);
                throw new Error("Задача не найдена.");
            }
            return task;
        });
        response.status(200).send(result);
    } catch (error) {
        if (response.status === 200) {
            response.status(500);
        }
        response.send({message: error.message});
    }
}

exports.getAll = async (request, response) => {
    try {
        const result = await db.sequelize.transaction(async (transaction) => {
            return await Task.findAll({
                where: Sequelize.or(
                    {creatorId: request.query.userId},
                    {responsibleId: request.query.userId}
                ),
                transaction,
                include: [{model: User, as: "responsible", attributes: ["username"]}]
            });
        });
        response.status(200).send(result);
    } catch (error) {
        if (response.status === 200) {
            response.status(500);
        }
        response.send({message: error.message});
    }
}
