const express = require("express");
const router = express.Router()  

const UsersController = require('../controller/users.controller')
const userscontroller = new UsersController()

router.post('/signup', userscontroller.createUser)
router.post('/login', userscontroller.loginUser)


module.exports = router