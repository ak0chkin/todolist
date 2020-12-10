module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define('tasks', {
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        expiresAt: {
            type: Sequelize.DATE
        },
        priority: {
            type: Sequelize.INTEGER
        },
        status: {
            type: Sequelize.INTEGER
        }
    });

    return Task;
};