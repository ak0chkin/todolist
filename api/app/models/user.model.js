module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('users', {
        surname: {
            type: Sequelize.STRING
        },
        name: {
            type: Sequelize.STRING
        },
        patronymic: {
            type: Sequelize.STRING
        },
        username: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        }
    });

    return User;
};