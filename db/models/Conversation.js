const Sequelize = require('sequelize')
const db = require('../sequelizeDb')

const Conversation = db.define('conversation', {
  user1: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  user2: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})


module.exports = Conversation