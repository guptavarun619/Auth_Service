const express = require("express");
const bodyParser = require("body-parser");

const bcrypt = require("bcrypt");

const { PORT } = require("./config/serverConfig");
const apiRoutes = require("./routes/index");

const app = express();

const initializeServer = () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/api", apiRoutes);

  app.listen(PORT, () => {
    console.log(`Authentication Server started on PORT: ${PORT}`);
  });
};

initializeServer();
