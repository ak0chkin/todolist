const env = require('./env.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
    host: env.host,
    dialect: env.dialect,
    operatorsAliases: false,

    pool: {
        max: env.pool.max,
        min: env.pool.min,
        acquire: env.pool.acquire,
        idle: env.pool.idle
    }
});

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
    foreignKey: 'performerId',
    as: 'appointed'
});

db.task.belongsTo(db.user, {
    as: 'creator'
});
db.task.belongsTo(db.user, {
    as: 'performer'
});


module.exports = db;