const express = require("express");
const bodyParser = require("body-parser");

// const UserRepository = require("./repository/user-repository");

const { PORT } = require("./config/serverConfig");
const apiRoutes = require("./routes/index");

const app = express();

const initializeServer = () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/api", apiRoutes);

  app.listen(PORT, async () => {
    console.log(`Authentication Server started on PORT: ${PORT}`);
    // const userRepository = new UserRepository();
    // const response = await userRepository.getById(3);
    // console.log(response);
  });
};

initializeServer();
