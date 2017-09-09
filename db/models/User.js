const Sequelize = require('sequelize')
const db = require('../sequelizeDb')
const bcrypt = require('bcrypt')

const User = db.define('user', {
  first_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  last_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true
    }
  },
  username: {
    type: Sequelize.STRING,
    allowNull: true
  },
  password_digest: Sequelize.STRING, // This column stores the hashed password in the DB, via the beforeCreate/beforeUpdate hooks
  password: Sequelize.VIRTUAL, // Note that this is a virtual, and not actually stored in DB
  gender: {
    type: Sequelize.ENUM,
    values: ['Male', 'female']
  },
  bio: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  gems: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  latitude: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: null,
    validate: {min: -90, max: 90}
  },
  longitude: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: null,
    validate: {min: -180, max: 180}
  }
}, {
  hooks: {
    // NOTE!! the name of the define HAS to be a parameter on the lifecycle hooks on db models
    beforeCreate: setEmailAndPassword,
    beforeUpdate: setEmailAndPassword,
  },
  classMethods: {}
})

User.prototype.authenticate = function(plaintext){
  return new Promise((resolve, reject) =>
    bcrypt.compare(plaintext, this.password_digest, (err, result) => {
      if (err) reject(err)
      else resolve(result)
    }))
}

function setEmailAndPassword(user) {
  user.email = user.email && user.email.toLowerCase()
  if (!user.password) return Promise.resolve(user)

  return new Promise((resolve, reject) =>
    bcrypt.hash(user.get('password'), 10, (err, hash) => {
      if (err) reject(err)
      user.set('password_digest', hash)
      resolve(user)
    })
  )
}

module.exports = User
