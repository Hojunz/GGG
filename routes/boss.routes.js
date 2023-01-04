const express = require("express");
const router = express.Router();
const bossMiddleware = require("../middlewares/boss");

const BossesController = require("../controller/bosses.controller");
const bossescontroller = new BossesController();

router.post("/api/signupboss", bossescontroller.createBoss);
router.post("/api/loginboss", bossescontroller.loginBoss);

// 사용자 인증 미들웨어 추가
router.use(bossMiddleware, (req, res, next) => {
  next();
});

// 로그인 검사 (이 코드가 없어서 사장님 로그아웃 가능해서 주석 처리)
router.get('/me', bossMiddleware, async(req,res) => {
    res.json({ boss: res.locals.boss});
})

router.post("/logout", bossescontroller.logoutBoss);

module.exports = router;
