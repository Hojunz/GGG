const express = require("express");
const router = express.Router() 
const indexMiddleware = require('../middlewares/index') 

const BossesController = require('../controller/bosses.controller')
const bossescontroller = new BossesController()

router.post('/signup', bossescontroller.createBoss)
router.post('/login', bossescontroller.loginBoss)

//로그인 검사 ----------------------------------------------------------------------------------
router.get('/me', indexMiddleware, async(req,res) => {
    res.json({ user: res.locals.user });
})


module.exports = router