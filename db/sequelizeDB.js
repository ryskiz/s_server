const Sequelize = require('sequelize')

const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/sultan_swipe', {
  logging: false // unless you like the logs
})

//require in all your models

module.exports = db
