const db = require("../models");
const User = db.user;
const Task = db.task;
const Sequelize = db.Sequelize;

exports.create = async (request, response) => {
    try {
        const result = await db.sequelize.transaction(async (transaction) => {
            const creator = await User.findOne({
                where: {
                    id: request.body.creator
                },
                transaction
            });
            if (!creator) {
                response.status(404);
                throw new Error("Создатель не найден")
            }
            const responsible = await User.findOne({
                where: {
                    id: request.body.responsible
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
                    status: request.body.status,
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
            await Task.update({
                    title: request.body.title,
                    description: request.body.description,
                    expiresAt: request.body.expiresAt,
                    priority: request.body.priority,
                    status: request.body.status
                },
                {
                    where: {
                        id: request.query.id
                    },
                    transaction
                });
            return task;
        });
        response.status(200).send({message: "Задача успешно обновлена!", result});
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
            const task =  await Task.findOne({
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
                transaction
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
