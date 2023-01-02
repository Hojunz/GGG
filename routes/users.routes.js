const express = require("express");
const router = express.Router() 
const indexMiddleware = require('../middlewares/index') 

const UsersController = require('../controller/users.controller')
const userscontroller = new UsersController()

router.post('/signup', userscontroller.createUser)
router.post('/login', userscontroller.loginUser)

//로그인 검사 ----------------------------------------------------------------------------------
router.get('/me', indexMiddleware, async(req,res) => {
    res.json({ user: res.locals.user });
})


module.exports = router