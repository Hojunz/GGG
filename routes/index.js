const express = require("express");
const router = express.Router()  

const usersRouter = require('./users.routes')
const bossesRouter = require('./boss.routes')

router.use('/user', usersRouter)
router.use('/boss', bossesRouter)

module.exports = router