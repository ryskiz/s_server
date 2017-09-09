// apiRoutes/possibleMatches.js
const router = require('express').Router()
const Possible = require('../db/models/Swipes')

router.param('id', (req, res, next, id) => {
  Possible.findOrCreate({
    where: {
      userId: id
    }
  })
    .then((possible) => {
    possible[1] ? console.log("user created!") : console.log("USER FOUND!");
      req.possibleUserMatches = possible[0]
      next()
    })
    .catch(err => console.error(err))
})

// matches GET requests to /api/possibleMatches/
router.get('/:id', function (req, res, next) {
  console.log(`Matches array for user ${req.params.id}`, req.possibleUserMatches.matchIdArray)
  req.possibleUserMatches.matchIdArray ? res.send({user:req.possibleUserMatches.matchIdArray, message:"YO"}) : res.status(200)
      .send({message: "User does not have any possible matches!"})
})

// matches POST requests to /api/possibleMatches/
router.post('/:id', function (req, res, next) {
})

// matches PUT requests to /api/possibleMatches/:possibleMatchesId
router.put('/:id', function (req, res, next) {
  const usersPossible = req.possibleUserMatches;
  const updatedArr = usersPossible.addToMatchArray(+req.body.matchId);
  res.send({message: "updated users array", updatedArr})
})

// matches DELETE requests to /api/possibleMatches/:possibleMatchesId
router.delete('/:possibleMatchesId', function (req, res, next) { /* etc */})

module.exports = router
