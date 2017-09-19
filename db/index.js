const db = require('./sequelizeDb')
const User = require('./models/User')
const Possible = require('./models/Swipes')
const Convo = require('./models').Conversations
const Message = require('./models').Messages
const image = require('../Dummy/dummyphoto')
//require in all our models
require('./models')

// Syncing all the models at once. This promise is used by main.js.
let syncedDbPromise = db.sync({force: true})

syncedDbPromise
  .then(() => {
    console.log('Sequelize models synced to PostgreSQL')
    User.create({
      first_name: "Ryan",
      last_name: "Skinner",
      email: 'ryan.skinner@gmail.com',
      bio: 'I luv 2 code all da tyme!',
      password: "poop",
      gender: 'Male',
      photo: image
    })
      .then((user) => {
        console.log(`also created user ${user.first_name}`)
      })

    User.create({
      first_name: "Emma",
      last_name: "Stone",
      email: "e@e.com",
      bio: 'I luv pool boys!',
      password: "poop",
      gender: 'Female',
      photo: image
    })
      .then((user) => {
        console.log(`also created user ${user.first_name}`)
      })
    Convo.create({
      user1: 1,
      user2: 2
    })
      .then((convo) => {
        Message.create({
          message: 'Hey whasup!',
          to: 2,
          from: 1,
          read: false
        })
          .then((message) => {
            Message.create({
              message: 'Nothing much how ya doin ;)',
              to: 1,
              from: 2,
              read: false
            })
              .then((message2) => {
                convo.setMessages([message, message2])
              })
          })
      })

  })

module.exports = syncedDbPromise
