const db = require("../models");
const User = db.user;
const Task = db.task;
const Sequelize = db.Sequelize;

exports.createTask = async (request, response) => {
    try {
        const result = await db.sequelize.transaction(async (transaction) => {
            const performer = await User.findOne({
                attributes: ["id", "headId"],
                where: {
                    username: request.body.performer,
                },
                transaction,
            });
            if (!performer) {
                response.status(404);
                throw new Error("Ответственный не найден.")
            }
            if (performer.headId !== request.userId && performer.id !== request.userId) {
                response.status(401);
                throw new Error("Недостаточно прав!");
            }
            return await Task.create({
                    title: request.body.title,
                    description: request.body.description,
                    expiresAt: request.body.expiresAt,
                    priority: request.body.priority,
                    status: 0,
                    creatorId: request.userId,
                    performerId: performer.id,
                },
                {
                    transaction,
                });
        });
        response.status(200).send({message: "Задача успешно создана!", result});
    } catch (error) {
        if (response.statusCode === 200) {
            response.status(500);
        }
        response.send({message: error.message});
    }
}

exports.updateTask = async (request, response) => {
    try {
        await db.sequelize.transaction(async (transaction) => {
            const task = await Task.findOne({
                where: {
                    id: request.query.id,
                },
                transaction,
            })
            if (!task) {
                response.status(404);
                throw new Error("Задача не найдена.");
            }
            const performer = await User.findOne({
                attributes: ["id", "headId"],
                where: {
                    username: request.body.performer,
                },
                transaction,
            });
            if (!performer) {
                response.status(404);
                throw new Error("Ответственный не найден.");
            }
            if (performer.headId !== request.userId && performer.id !== request.userId) {
                response.status(401);
                throw new Error("Недостаточно прав!");
            }
            if (task.creatorId === request.userId) {
                await task.update({
                        title: request.body.title,
                        description: request.body.description,
                        expiresAt: request.body.expiresAt,
                        priority: request.body.priority,
                        status: request.body.status,
                        performerId: performer.id,
                    },
                    {
                        transaction,
                    });
            } else if (task.performerId === request.userId) {
                await task.update({
                        status: request.body.status,
                    },
                    {
                        transaction,
                    });
            } else {
                response.status(401);
                throw new Error("Недостаточно прав!");
            }

            return task;
        });
        response.status(200).send({message: "Задача успешно обновлена!"});
    } catch (error) {
        if (response.statusCode === 200) {
            response.status(500);
        }
        response.send({message: error.message});
    }
}

exports.getTask = async (request, response) => {
    try {
        const result = await db.sequelize.transaction(async (transaction) => {
            const task = await Task.findOne({
                where: {
                    id: request.query.id,
                },
                transaction,
            });
            if (!task) {
                response.status(404);
                throw new Error("Задача не найдена.");
            }
            if (task.creatorId !== request.userId && task.performerId !== request.userId) {
                response.status(401);
                throw new Error("Недостаточно прав!");
            }
            return task;
        });
        response.status(200).send(result);
    } catch (error) {
        if (response.statusCode === 200) {
            response.status(500);
        }
        response.send({message: error.message});
    }
}

exports.getBoard = async (request, response) => {
    try {
        const result = await db.sequelize.transaction(async (transaction) => {
            const tasks = await Task.findAll({
                where: Sequelize.or(
                    {creatorId: request.userId},
                    {performerId: request.userId},
                ),
                transaction,
                include: [{model: User, as: "performer", attributes: ["username"]}],
                order: [['updatedAt', 'DESC']],
            });
            const performers = await User.findAll({
                attributes: ['username'],
                where: {
                    headId: request.userId,
                }
            });
            return {tasks: tasks, performers: performers.map(({username}) => username)};
        });
        response.status(200).send(result);
    } catch (error) {
        if (response.statusCode === 200) {
            response.status(500);
        }
        response.send({message: error.message});
    }
}