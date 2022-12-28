const UserService = require("../services/user-service");

const userService = new UserService();

const create = async (req, res) => {
  try {
    const response = await userService.create({
      email: req.body.email,
      password: req.body.password,
    });
    res.status(201).json({
      data: response,
      success: true,
      message: "User has been created successfully",
      err: {},
    });
  } catch (error) {
    res.status(500).json({
      data: {},
      success: false,
      message: "User cannot be created",
      err: { error },
    });
  }
};

const signIn = async (req, res) => {
  try {
    const authToken = await userService.signIn(
      req.body.email,
      req.body.password
    );
    res.status(200).json({
      data: authToken,
      success: true,
      message: "Successfully signed in",
      err: {},
    });
  } catch (error) {
    res.status(500).json({
      data: {},
      success: false,
      message: "Unable to Signin",
      err: { error },
    });
  }
};

const isAuthenticated = async (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    const response = await userService.isAuthenticated(token);
    res.status(200).json({
      data: response,
      success: true,
      message: "User is authenticated and token is valid",
      err: {},
    });
  } catch (error) {
    res.status(500).json({
      data: {},
      success: false,
      message: "Unable to Signin",
      err: { error },
    });
  }
};

const isAdmin = async (req, res) => {
  try {
    const userId = req.body.id;
    const response = await userService.isAdmin(userId);
    res.status(200).json({
      data: response,
      success: true,
      message: "Successfully fetched whether user is admin or not",
      err: {},
    });
  } catch (error) {
    res.status(500).json({
      data: {},
      success: false,
      message: "Unable to verify if the user is admin or not",
      err: { error },
    });
  }
};

module.exports = {
  create,
  signIn,
  isAuthenticated,
  isAdmin,
};
