const Sequelize = require('sequelize');
const db = require('../config/postgresDatabase');

const User = db.define('user', {
  email: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  }
})

module.exports = User;