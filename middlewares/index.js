const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const express = require('express')
const {secretKey} = require('../config/secretkey.js')

const { User } = require('../models');

const app = express();
app.use(cookieParser());

module.exports = (req, res, next) => {
    const {cookie} = req.headers

    if(!cookie){
        res.status(401).send({
            errorMessage: "로그인 후 이용해 주세요."
        });
        return;
    }
    const[authType, authToken] = cookie.split('=')
    if (!authToken || authType !== 'x_auth') {
      res.status(402).send({
        errorMessage: "로그인 후 이용해 주세요."
      });
      return
    }
    try {
        const { id } = jwt.verify(authToken, secretKey);
        User.findByPk(id).then((user) => {
            res.locals.user = user
            // console.log(res.locals.user)
            next();
        });
    } catch (err) {
        res.status(401).send({
            errorMessage: "이미 로그인이 되어 있습니다."
        });
    }
};

// const jwt = require("jsonwebtoken");
// const { User } = require("../models");
// const {secretKey} = require('../config/secretkey.js')

// module.exports = (req, res, next) => {
//   const { authorization } = req.headers;
//   const [authType, authToken] = (authorization || "").split(" ");
//        //token     Bearer
//   if (!authToken || authType !== "Bearer") {
//     res.status(401).send({
//       errorMessage: "로그인 후 이용 가능한 기능입니다.",
//     });
//     return;
//   }

//   try {
//     const { id } = jwt.verify(authToken, secretKey);
//     // console.log('아이디', id)
//     User.findByPk(id).then((user) => {
//       res.locals.user = user;
//       // console.log('uesr', res.locals.user)
//       next();
//     }); 
//   } catch (err) {
//     res.status(401).send({
//       errorMessage: "로그인 후 이용 가능한 기능입니다.",
//     });
//   }
// };
