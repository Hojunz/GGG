const {User} = require('../models')

class UserRepository {
    createUser = async (email, nickname, password, money) => {
        const createUserdata = await User.create({email, nickname, password, money})
        return createUserdata
    }
}

module.exports = UserRepository