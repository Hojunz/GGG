const BossRepository = require("../repository/bosses.repository");

class BossService {
  bossRepository = new BossRepository();

  // 유저 생성
  createBoss = async (email, nickname, password, phonenumber, money, isAdmin) => {
    const createBossdata = await this.bossRepository.createBoss(
      email,
      nickname,
      password,
      phonenumber,
      money,
      isAdmin,
    );

    return {
      id: createBossdata.id,
      email: createBossdata.email,
      nickname: createBossdata.nickname,
      password: createBossdata.password,
      phonenumber: createBossdata.phonenumber,
      money: createBossdata.money,
      isAdmin: createBossdata.isAdmin,
      createdAt: createBossdata.createdAt,
      updatedAt: createBossdata.updatedAt,
    };
  };

  // 로그인하기
  loginBoss = async (email) => {
    const login = await this.bossRepository.loginBoss(email);

    return {
      id: login.id,
      email: login.email,
      nickname: login.nickname,
      password: login.password,
      phonenumber: login.phonenumber,
      money: login.money,
      isAdmin: login.isAdmin,
      createdAt: login.createdAt,
      updatedAt: login.updatedAt,
    };
  };
}

module.exports = BossService;
