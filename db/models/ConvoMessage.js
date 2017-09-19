const Sequelize = require('sequelize')
const db = require('../sequelizeDb')

const Message = db.define('message', {
  message: {
    type: Sequelize.TEXT
  },
  to: {
    type: Sequelize.INTEGER
  },
  from: {
    type: Sequelize.INTEGER
  },
  read: {
    type: Sequelize.BOOLEAN
  }
})

module.exports = Message
