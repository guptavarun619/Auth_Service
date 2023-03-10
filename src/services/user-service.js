const UserRepository = require("../repository/user-repository");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { JWT_KEY } = require("../config/serverConfig");
const AppError = require("../../util/error-handler");
class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async create(data) {
    try {
      const user = await this.userRepository.create(data);
      return user;
    } catch (error) {
      if (error.name == "SequelizeValidationError") {
        throw error;
      }
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

  async signIn(email, plainPassword) {
    try {
      // step1 -> fetcht he user using the email
      const user = await this.userRepository.getByEmail(email);
      // step2 -> compare incoming plain password with stored encrypted password
      const passwordMatch = this.verifyPassword(plainPassword, user.password);
      if (!passwordMatch) {
        console.log("Password doesn't match");
        throw { error: "Incorrect Password" };
      }

      // step3 -> if password match create a JWT and return it
      const newAuthToken = this.createToken({ email: user.email, id: user.id });
      return newAuthToken;
    } catch (error) {
      if (error.name == "AttributeNotFound") {
        throw error;
      }

      console.log(
        "Something went wrong in the sign-in process (service layer)"
      );
      // console.log(error);
      throw error;
    }
  }

  async isAuthenticated(token) {
    try {
      const response = this.verifyToken(token);
      if (!response) {
        throw { error: "Invalid Token" };
      }
      // whatever business logic to check if the user still exists in DB
      const user = await this.userRepository.getById(response.id);
      if (!user) {
        throw { error: "No user with the corresponding token exists" };
      }
      return user.id;
    } catch (error) {
      console.log("Something went wrong in the token authentication process");
      throw error;
    }
  }

  verifyPassword(plainPassword, encryptedPassowrd) {
    try {
      return bcrypt.compareSync(plainPassword, encryptedPassowrd);
    } catch (error) {
      console.log(
        "Something went wrong in password verification (service layer)"
      );
      throw error;
    }
  }

  createToken(user) {
    try {
      const authToken = jwt.sign(user, JWT_KEY, { expiresIn: "1d" });
      return authToken;
    } catch (error) {
      console.log("Something went wrong in token creation (service layer)");
      throw error;
    }
  }

  verifyToken(authToken) {
    try {
      const jwtDecodedUser = jwt.verify(authToken, JWT_KEY);
      return jwtDecodedUser;
    } catch (error) {
      console.log("Something went wrong in token verification (service layer)");
      throw error;
    }
  }

  async isAdmin(userId) {
    try {
      return this.userRepository.isAdmin(userId);
    } catch (error) {
      console.log("Something went wrong in service layer");
      throw error;
    }
  }
}

module.exports = UserService;
