const BossRepository = require('../repositroy/bosses.repository')

class BossService {
    bossRepository = new BossRepository()

    // 유저 생성
    createBoss = async (email, nickname, password, phonenumber, money) => {

        const createBossdata = await this.bossRepository.createBoss(email, nickname, password, phonenumber, money)

        return {
            bossId: createBossdata.null,
            email: createBossdata.email,
            nickname: createBossdata.nickname,
            password: createBossdata.password,
            phonenumber: createBossdata.phonenumber,
            money: createBossdata.money,
            createdAt: createBossdata.createdAt,
            updatedAt: createBossdata.updatedAt,
        }
    }

    // 로그인하기
    loginBoss = async (email) => {
        const login = await this.bossRepository.loginBoss(email)

        return {
            bossId: login.id,
            email: login.email,
            nickname: login.nickname,
            password: login.password,
            phonenumber: login.phonenumber,
            money: login.money,
            createdAt: login.createdAt,
            updatedAt: login.updatedAt,
        }
    }
}

module.exports = BossService