const express = require("express");
const router = express.Router() 
const indexMiddleware = require('../middlewares/index') 

const UsersController = require('../controller/users.controller')
const userscontroller = new UsersController()

router.post('/signup', userscontroller.createUser)
router.post('/login', userscontroller.loginUser)


router.use(indexMiddleware, (req, res, next) => {
    next()
})
router.get('/me', userscontroller.loginInfo)
router.post('/logout', userscontroller.logoutUser)


module.exports = router