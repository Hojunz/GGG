const UserService = require('../service/users.service')
const jwt = require('jsonwebtoken')
const { secretKey, option } = require("../config/secretKey");

class UsersController{
    userService = new UserService()

    //회원가입입니다.~~~
    createUser = async(req, res, next) => {
        try{
            const {email, nickname, password, confirmpassword} = req.body

            //비밀번호 확인
            if (password !== confirmpassword) {
                res.status(400).send({errorMessage: '패스워드가 일치하지 않습니다.'})
                return
            }
            // 닉네임 포함여부
            if (password.includes(nickname) == true) {
                return res.status(400).send({errorMessage:'닉네임 포함 NO'})
            }

            await this.userService.createUser(email, nickname, password)
            
            res.status(201).send({message: '회원가입에 성공하였습니다.'})
        
        }catch(error){
            res.status(400).json({errormessage: error.message})
        }
    }
    //로그인 입니다.
    loginUser = async(req, res, next) => {
        try {
            const {email, password} = req.body
            const user = await this.userService.loginUser(email)
            
            if((email !== user.email) || (password !== user.password)) {
                res.status(400).send({errorMessage:'이메일 또는 패스워드를 확인해주세요.'})
            }
           
            // res.send({token: jwt.sign({id: user.userId}, secretKey, option)})
            const token = jwt.sign({id: user.userId}, secretKey, option)

            res.cookie('x_auth', token, {httpOnly: true, maxAge: 0.5*60*60*1000})
            res.status(200).json({result: "success", token: token})
        }catch(error){
            res.status(400).json({errormessage: error.message})
        }
    }
    //로그인 확인 입니다.
    loginInfo = async(req, res, next) => {
        const User = res.locals.user
        res.json({info: User})
    }
    //로그아웃입니다.
    logoutUser = async(req, res, next) => {
        res.clearCookie('x_auth')
        return res.status(200).send({message: '로그아웃 완료'})
    }

}

module.exports = UsersController;