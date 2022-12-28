const express = require("express");
const bodyParser = require("body-parser");

const db = require("./models/index");

const { PORT } = require("./config/serverConfig");
const apiRoutes = require("./routes/index");

const app = express();

const initializeServer = () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/api", apiRoutes);

  app.listen(PORT, async () => {
    console.log(`Authentication Server started on PORT: ${PORT}`);
    if (process.env.DB_SYNC) {
      db.sequelize.sync({ alter: true });
    }

    // const service = new UserService();
    // const user = {
    //   id: 3,
    //   email: "ravena@ravenclaw.hw",
    // };
    // // const newToken = service.createToken(user);
    // // console.log(newToken);
    // const authToken =
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJyYXZlbmFAcmF2ZW5jbGF3Lmh3IiwiaWF0IjoxNjcxNjk1OTAyLCJleHAiOjE2NzE2OTU5MzJ9.ppIA41euJc_xRjzBSYSGVZeQu-UuWMt8vIXT3PvkMOA";
    // const verify = service.verifyToken(authToken);
    // console.log(verify);
  });
};

initializeServer();
