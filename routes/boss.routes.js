const express = require("express");
const router = express.Router();
const indexMiddleware = require("../middlewares/index");

const BossesController = require("../controller/bosses.controller");
const bossescontroller = new BossesController();

router.post("/signup", bossescontroller.createBoss);
router.post("/login", bossescontroller.loginBoss);

// 사용자 인증 미들웨어 추가
router.use(indexMiddleware, (req, res, next) => {
  next();
});

//로그인 검사 (이 코드가 없어서 사장님 로그아웃 가능해서 주석 처리)
// router.get('/me', indexMiddleware, async(req,res) => {
//     res.json({ user: res.locals.user });
// })

router.post("/logout", bossescontroller.logoutBoss);

module.exports = router;
