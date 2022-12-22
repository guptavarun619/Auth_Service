const validateUserAuth = (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      success: false,
      data: {},
      message: "Something went wrong in authentication",
      err: "Email or password is missing in the authentication request",
    });
  }
  next();
};

module.exports = {
  validateUserAuth,
};
