const express = require("express");
const router = express.Router();
const indexMiddleware = require("../middlewares/index");
const { sequelize } = require("sequelize");
const { Laundry, User } = require("../models");

const UsersController = require("../controller/users.controller");
const userscontroller = new UsersController();

// 회원 가입 폼
router.get("/signup", (req, res) => {
  res.render("signup.ejs");
});

// 로그인 폼
router.get("/login", (req, res) => {
  res.render("login.ejs");
});

router.post("/signup", userscontroller.createUser);
router.post("/login", userscontroller.loginUser);

router.use(indexMiddleware, (req, res, next) => {
  next();
});

router.get("/mypage", async (req, res) => {
  const userid = res.locals.user.id;
  const user = await User.findByPk(userid);
  const { dataValues: data } = user;
  res.render("mypage.ejs", { data });
});

router.post("/logout", userscontroller.logoutUser);
router.get("/me", userscontroller.loginInfo);

module.exports = router;

// 마이 페이지 (이미지 추가 버전)
// router.get("/mypage", async (req, res) => {
//   const laundry = await Laundry.findOne({ where: { id: 1 } });
//   const { dataValues: data } = laundry;
//   res.render("mypage.ejs", { data });
// });
