const Sequelize = require('sequelize');
const keys = require('../config/keys');

module.exports = new Sequelize('learn502', 'postgres', keys.password, {
    host: 'localhost',
    dialect: 'postgres',

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
});
