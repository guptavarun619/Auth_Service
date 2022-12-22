const express = require("express");
const { PORT } = require("./config/serverConfig");

const app = express();

const initializeServer = () => {
  app.listen(PORT, () => {
    console.log(`Authentication Server started on PORT: ${PORT}`);
  });
};

initializeServer();
