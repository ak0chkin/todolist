const config = require('../config/db.config.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        operatorsAliases: false,

        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('../models/user.model.js')(sequelize, Sequelize);
db.task = require('../models/task.model.js')(sequelize, Sequelize);

db.user.hasMany(db.user, {
    foreignKey: 'headId'
});

db.user.belongsTo(db.user, {
    as: 'head'
});

db.user.hasMany(db.task, {
    foreignKey: 'creatorId',
    as: 'created'
});

db.user.hasMany(db.task, {
    foreignKey: 'responsibleId',
    as: 'appointed'
});

db.task.belongsTo(db.user, {
    as: 'creator'
});
db.task.belongsTo(db.user, {
    as: 'responsible'
});

module.exports = db;
