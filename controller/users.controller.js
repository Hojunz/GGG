const UserService = require('../service/users.service')

class UsersController{
    userService = new UserService()

    createUser = async(req, res, next) => {
        try{
            const {email, nickname, password, confirmpassword, money} = req.body

            //비밀번호 확인
            if (password !== confirmpassword) {
                res.status(400).send({errorMessage: '패스워드가 일치하지 않습니다.'})
                return
            }
            // 닉네임 포함여부
            if (password.includes(nickname) == true) {
                return res.status(400).send({errorMessage:'닉네임 포함 NO'})
            }

            await this.userService.createUser(
                email, nickname, password, money
            )
            res.status(201).send({message: '회원가입에 성공하였습니다.'})
        
        }catch(error){
            res.status(400).json({errormessage: error.message})
        }
    }
}

module.exports = UsersController;