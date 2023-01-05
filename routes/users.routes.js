const express = require("express");
const router = express.Router();
const indexMiddleware = require("../middlewares/index");

// test code
const { Laundry, User } = require("../models");

const UsersController = require("../controller/users.controller");
const userscontroller = new UsersController();

// 회원가입 폼
router.get("/signup", async (req, res) => {
  res.render("userSignup.ejs");
});

// 로그인 폼
router.get("/login", async (req, res) => {
  res.render("userLogin.ejs");
});

router.post("/signup", userscontroller.createUser);
router.post("/login", userscontroller.loginUser);

// 마이 페이지
router.get("/mypage", async (req, res) => {
  const laundry = await Laundry.findOne({ where: { id: 1 } });
  const { dataValues: data } = laundry;
  res.render("mypage.ejs", { data });
});

router.use(indexMiddleware, (req, res, next) => {
  next();
});

router.get("/mypage", userscontroller.findUser);
router.get("/me", userscontroller.loginInfo);
router.post("/logout", userscontroller.logoutUser);

module.exports = router;
