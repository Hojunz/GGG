const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const express = require("express");
const { secretKey } = require("../config/secretkey.js");

const { User } = require("../models");

const app = express();
app.use(cookieParser());

module.exports = (req, res, next) => {
  const cookie = req.cookies["x_auth"];

  if (!cookie) {
    res.status(401).send({
      errorMessage: "로그인 후 이용해 주세요.",
    });
    return;
  }
  //   const [authType, authToken] = cookie.split("=");
  //   if (!authToken || authType !== "x_auth") {
  //     res.status(402).send({
  //       errorMessage: "로그인 후 이용해 주세요.",
  //     });
  //     return;
  //   }
  try {
    const { id } = jwt.verify(cookie, secretKey);
    User.findByPk(id).then((user) => {
      res.locals.user = user;
      // console.log(res.locals.user)
      next();
    });
  } catch (err) {
    res.status(401).send({
      errorMessage: "이미 로그인이 되어 있습니다.",
    });
  }
};
