const UserRepository = require("../repository/user-repository");
const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../config/serverConfig");
class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async create(data) {
    try {
      const user = await this.userRepository.create(data);
      return user;
    } catch (error) {
      console.log("Something went wrong in service layer");
      throw error;
    }
  }

  async destory(userId) {
    try {
      const user = await this.userRepository.destory(userId);
      return user;
    } catch (error) {
      console.log("Something went wrong in service layer");
      throw error;
    }
  }

  createToken(user) {
    try {
      const authToken = jwt.sign(user, JWT_KEY, { expiresIn: "1d" });
      return authToken;
    } catch (error) {
      console.log("Something went wrong in token creation");
      throw error;
    }
  }

  async verifyToken(authToken) {
    try {
      const jwtDecodedUser = jwt.verify(authToken, JWT_KEY);
      console.log(jwtDecodedUser);
      // whatever business logic to check if the user still exists in DB
      const user = await this.userRepository.getById(jwtDecodedUser.id);
      if (jwtDecodedUser.email != user.email) return false;
      return true;
    } catch (error) {
      console.log("Something went wrong in token verification");
      throw error;
    }
  }
}

module.exports = UserService;
