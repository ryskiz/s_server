const router = require('express').Router()

router.use('/users', require('./users')) // matches all requests to /api/users/
router.use('/possible', require('./possibleMatches')) // matches all requests to  /api/someRoute/

router.use(function (req, res, next) {
  const err = new Error('Not found.')
  err.status = 404;
  next(err)
})


module.exports = router
