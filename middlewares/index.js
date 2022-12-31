const jwt = require("jsonwebtoken");
const { User } = require("../models");
const {secretKey} = require('../config/secretkey.js')

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const [authType, authToken] = (authorization || "").split(" ");
       //token     Bearer
  if (!authToken || authType !== "Bearer") {
    res.status(401).send({
      errorMessage: "로그인 후 이용 가능한 기능입니다.",
    });
    return;
  }

  try {
    const { id } = jwt.verify(authToken, secretKey);
    User.findByPk(id).then((user) => {
      res.locals.user = user; 
      next();
    }); 
  } catch (err) {
    res.status(401).send({
      errorMessage: "로그인 후 이용 가능한 기능입니다.",
    });
  }
};