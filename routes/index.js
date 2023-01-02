const express = require("express");
const router = express.Router()  

const usersRouter = require('./users.routes')
const bossesRouter = require('./boss.routes')
const reviewsRouter = require('./reviews.routes')

router.use('/user', usersRouter)
router.use('/boss', bossesRouter)
router.use('/laundry', reviewsRouter)

module.exports = router