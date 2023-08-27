require("dotenv").config();
const express = require("express");
const sequelize = require("./db");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const models = require("./models/userModel");
const router = require("./router/index");

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/api", router);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};
start();
