// apiRoutes/conversations.js
const router = require('express').Router()
const Messages = require('../db/models/ConvoMessage')
const EventEmitter = require('events').EventEmitter
const Conversations = require('../db/models').Conversations
const Listener = new EventEmitter()
//Don't know how many listeners an eventEmitter can handle
Listener.setMaxListeners(1000)


/* ------------------------------------------------------
 Eager load the associated messages with the conversation
 ------------------------------------------------------ */
router.get('/:id', (req, res, next) => {
  Conversations.findAll({
    where: {
      $or: [{user1: req.params.id}, {user2: req.params.id}]
    },
    include: [{
      model: Messages
    }]
  })
    .then((data) => {
      res.send(data)
    })
    .catch(err => console.error(err))
})

/* -------------------------------------------------
 Start the long poll listen for any message updates
 -------------------------------------------------- */
router.get('/poll/:id', (req, res, next) => {
  Listener.once(`message${req.params.id}`, function (data) {
    res.send(data)
  })
})

/* -------------------------------------------------
 Create message and assign it to proper convo, emit
 event to send data down to listening users
 -------------------------------------------------- */
router.post('/:id', (req, res, next) => {
  const {message, to, from, read} = req.body
  Messages.create({
    message,
    to,
    from,
    read,
    conversationId: req.params.id
  })
    .then((message) => {
      Listener.emit(`message${to}`, message)
      res.status(200).end()
    })
    .catch(err => console.error(err))
})

module.exports = router