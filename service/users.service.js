const UserRepository = require("../repository/users.repository");

class UserService {
  userRepository = new UserRepository();

  // 유저 생성
  createUser = async (email, nickname, password) => {
    const createUserdata = await this.userRepository.createUser(
      email,
      nickname,
      password
    );

    return {
      userId: createUserdata.null,
      email: createUserdata.email,
      nickname: createUserdata.nickname,
      password: createUserdata.password,
      createdAt: createUserdata.createdAt,
      updatedAt: createUserdata.updatedAt,
    };
  };

  // 로그인하기
  loginUser = async (email) => {
    const login = await this.userRepository.loginUser(email);

    return {
      userId: login.id,
      email: login.email,
      nickname: login.nickname,
      password: login.password,
      money: login.money,
      createdAt: login.createdAt,
      updatedAt: login.updatedAt,
    };
  };
}

module.exports = UserService;
