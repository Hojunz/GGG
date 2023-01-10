const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const express = require("express");
const { secretKey2 } = require("../config/secretkey.js");

const { Boss } = require("../models");

const app = express();
app.use(cookieParser());

module.exports = (req, res, next) => {
  const { cookie } = req.headers;

  if (!cookie) {
    res.status(401).send({
      errorMessage: "로그인 후 이용해 주세요.",
    });
    return;
  }
  const [authType, authToken] = cookie.split("=");
  if (!authToken || authType !== "x_auth") {
    res.status(402).send({
      errorMessage: "로그인 후 이용해 주세요.",
    });
    return;
  }
  try {
    const { id } = jwt.verify(authToken, secretKey2);
    Boss.findByPk(id).then((boss) => {
      res.locals.boss = boss;
      next();
    });
  } catch (err) {
    res.status(401).send({
      errorMessage: "이미 로그인이 되어 있습니다.",
    });
  }
};
