const express = require("express");
const router = express.Router();
const indexMiddleware = require("../middlewares/index");

const BossesController = require("../controller/bosses.controller");
const bossescontroller = new BossesController();

router.post("/signup", bossescontroller.createBoss); // 회원가입
router.post("/login", bossescontroller.loginBoss); // 로그인

// 사용자 인증 미들웨어 추가
router.use(indexMiddleware, (req, res, next) => {
  next();
});

router.post("/logout", bossescontroller.logoutBoss); // 로그아웃

module.exports = router;
