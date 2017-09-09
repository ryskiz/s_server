// apiRoutes/users.js
const router = require('express').Router()
const User = require('../db/models/User')


// matches GET requests to /api/users/
router.get('/', function (req, res, next) {
  User.findAll().then(users => {
    res.send({users})
  })
})

router.param('userName', (req, res, next, userName) => {
  User.findOne({
    where: {
      email: userName
    }
  })
    .then((user) => {
      req.user = user;
      next()
    })
    .catch(err => res.sendStatus(500))
})

router.get('/:id', function (req, res, next) {
  req.user ? res.send(req.user) : res.status(500).send({message: "could not find user"})
})

// matches POST requests to /api/users/
router.post('/', function (req, res, next) {
  const {email, password, bio, gender, firstName, lastName} = req.body;
  User.create({
    email,
    password,
    bio,
    gender,
    first_name: firstName,
    last_name: lastName
  })
    .then((user) => {
    res.send(user)
    })
    .catch(err => console.error(err))
})

// matches PUT requests to /api/users/:userId
router.put('/:userName', function (req, res, next) {
  if(!req.user) res.status(404).send({message: "either username or password is incorrect!"})
  req.user.authenticate(req.body.password)
    .then((user) => {
      console.log('authenicated response', user)
      //if the password is correct for the found user
      user ? res.send(req.user) : res.status(404).send({message: "either username or password is incorrect!"})
    })
    .catch(err => console.error(err))
});

// matches DELETE requests to /api/users/:userId
router.delete('/:userId', function (req, res, next) { /* etc */ })

module.exports = router
