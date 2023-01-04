const {Boss} = require('../models')

class BossRepository {
    //회원가입 입니다
    createBoss = async (email, nickname, password, phonenumber, money, isAdmin) => {
        const createBossdata = await Boss.create({email, nickname, password, phonenumber, money, isAdmin})
        return createBossdata
    }
    // 로그인 입니다
    loginBoss = async(email) => {
        const boss = await Boss.findOne({where: {email}})

        return boss
    }
}

module.exports = BossRepository