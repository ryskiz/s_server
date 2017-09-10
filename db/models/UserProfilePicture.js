const Sequelize = require('sequelize')
const db = require('../sequelizeDb')

const UserProfilePicture = db.define('userProfilePicture', {
  profilePicture: {
    type: Sequelize.DataTypes.BLOB,
    allowNull: true
  }
})

module.exports = UserProfilePicture
