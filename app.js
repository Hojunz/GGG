const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const nunjucks = require("nunjucks");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const { readSync } = require("fs");
const { sequelize } = require("./models");
const fs       = require('fs')

const routes = require("./routes");

//process.env.COOKIE_SECRET없음
dotenv.config(); // process.env
//process.env.COOKIE_SECRET있음

const app = express();
app.set("port", process.env.PORT || 3000);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: { httpOnly: true, secure: false },
  })
);

//-------------------프론트쪽 임시구역-------------------------------------------
//-------------------프론트쪽 임시구역-------------------------------------------
app.get('/', (req, res) => {
  res.render('index')
});

app.get('/homeimg', (req, res) => {
  fs.readFile(__dirname + '/public/images/homePng4.png', (err, data) => {
    if (err) {
      return res.send('Error Occured');
    }
    res.writeHead(200, {'Content-Type': 'image/png'});
    res.end(data);
  });
});

//----------영상, 이미지--------------------------
app.get('/laundryicon', (req, res) => {
  fs.readFile(__dirname + '/public/images/laundryicon2.png', (err, data) => {
    if (err) {
      return res.send('Error Occured');
    }
    res.writeHead(200, {'Content-Type': 'image/png'});
    res.end(data);
  });
});

// 빨래신청 예시 이미지
app.get('/laundryimage', (req, res) => {
  fs.readFile(__dirname + '/public/images/laundry3.jpg', (err, data) => {
    if (err) {
      return res.send('Error Occured');
    }
    res.writeHead(200, {'Content-Type': 'image/jpg'});
    res.end(data);
  });
});

app.get('/homevideo', (req, res) => {
  fs.readFile(__dirname + '/public/images/video.mp4', (err, data) => {
    if (err) {
      return res.send('Error Occured');
    }
    res.writeHead(200, {'Content-Type': 'video/mp4'});
    res.end(data);
  });
});

app.get('/homevideo2', (req, res) => {
  fs.readFile(__dirname + '/public/images/video2.mp4', (err, data) => {
    if (err) {
      return res.send('Error Occured');
    }
    res.writeHead(200, {'Content-Type': 'video/mp4'});
    res.end(data);
  });
});
//----------영상, 이미지--------------------------

app.get('/login', (req, res) => {
  res.render('login');
})

app.get('/loginboss', (req, res) => {
  res.render('loginboss');
});

app.get('/signup', (req, res) => {
  res.render('signup')
})

app.get('/signupboss', (req, res) => {
  res.render('signupboss')
})

app.get('/usermypage', (req, res) => {
  res.render('mypage')
})

app.get('/postlaundry', (req, res) => {
  res.render('postlaundry')
})

app.get('/usermypage/reviews', (req, res) => {
  res.render('userreviews')
})

app.get('/boss', (req, res) => {
  res.render('boss')
})

app.get('/boss/reviews', (req, res) => {
  res.render('bossreviews')
})
//-------------------프론트쪽 임시구역-------------------------------------------
//-------------------프론트쪽 임시구역-------------------------------------------

//라우터 연결
app.use("/api", routes);

// 페이지 없을 시 에러 처리
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 405;
  next(error);
});
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {}; //에러로그 서비스에 넘김
  res.status(err.status || 500);
  res.render("error");
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기중");
});
