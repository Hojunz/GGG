const UserService = require("../service/users.service");
const jwt = require("jsonwebtoken");
const { secretKey, option } = require("../config/secretKey");

class UsersController {
  userService = new UserService();

  //회원가입입니다.~~~
  createUser = async (req, res, next) => {
    try {
      const { email, nickname, password, confirmpassword } = req.body;

      //비밀번호 확인
      if (password !== confirmpassword) {
        res
          .writeHead(400, { "Content-Type": "text/html;charset=UTF-8" })
          .write(
            "<script>alert('비밀번호가 일치하지 않습니다.'); history.back()</script>"
          );
        res.end();
        //.render("alert", { error: "비밀번호가 일치하지 않습니다." }); // alert 페이지로 렌더링하는 방법
      }
      // 닉네임 포함여부
      if (password.includes(nickname)) {
        res
          .writeHead(400, { "Content-Type": "text/html;charset=UTF-8" })
          .write(
            "<script>alert('비밀번호에 닉네임이 포함되어 있습니다.'); history.back()</script>"
          );
        res.end();
      }

      const user = await this.userService.createUser(email, nickname, password);
      res.status(201).render("login");
    } catch (error) {
      if (error.message === "Validation error") {
        res
          .writeHead(400, { "Content-Type": "text/html;charset=UTF-8" })
          .write(
            "<script>alert('중복된 아이디나 닉네임이 있습니다.'); history.back()</script>"
          );
        res.end();
      } else {
        res.status(400).json({ errormessage: error.message });
      }
    }
  };

  //로그인 입니다.
  loginUser = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await this.userService.loginUser(email);

      if (email !== user.email || password !== user.password) {
        res
          .writeHead(400, { "Content-Type": "text/html;charset=UTF-8" })
          .write(
            "<script>alert('이메일 또는 패스워드를 확인해주세요.'); history.back()</script>"
          );
      }

      const token = jwt.sign({ id: user.userId }, secretKey, option);

      res.cookie("x_auth", token, {
        httpOnly: true,
        maxAge: 0.5 * 60 * 60 * 1000,
      });

      res.redirect("http://localhost:3000/mypage");
    } catch (error) {
      if (error.message === "Validation error") {
        res
          .status(404)
          .json({ errorMessage: "중복된 이메일 또는 닉네임이 있습니다." });
      }
      if (error.message === "Cannot read properties of null (reading 'id')") {
        res
          .writeHead(400, { "Content-Type": "text/html;charset=UTF-8" })
          .write(
            "<script>alert('이메일 또는 닉네임을 확인해주세요.'); history.back()</script>"
          );
      } else {
        res.status(400).json({ errormessage: error.message });
      }
    }
  };
  //로그인 확인 입니다.
  loginInfo = async (req, res, next) => {
    const User = res.locals.user;
    res.json({ info: User });
  };
  //로그아웃입니다.
  logoutUser = async (req, res, next) => {
    res.clearCookie("x_auth");
    return res.status(200).send({ message: "로그아웃 완료" });
  };
}

module.exports = UsersController;
