const {User} = require('../models')

class UserRepository {
    //회원가입 입니다
    createUser = async (email, nickname, password, money) => {
        const createUserdata = await User.create({email, nickname, password, money})
        return createUserdata
    }
    // 로그인 입니다
    loginUser = async(email) => {
        const user = await User.findOne({where: {email}})

        return user
    }
}

module.exports = UserRepository