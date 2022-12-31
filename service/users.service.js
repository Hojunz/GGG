const UserRepository = require('../repositroy/users.repository')

class UserService {
    userRepository = new UserRepository()

    // 유저 생성
    createUser = async (email, nickname, password, money) => {

        const createUserdata = await this.userRepository.createUser(email, nickname, password, money)

        return {
            userId: createUserdata.null,
            email: createUserdata.email,
            nickname: createUserdata.nickname,
            password: createUserdata.password,
            money: createUserdata.money,
            createdAt: createUserdata.createdAt,
            updatedAt: createUserdata.updatedAt,
        }
    }
}

module.exports = UserService