const sequalize = require("../db");
const { DataTypes } = require("sequelize");

const TokenSchema = sequalize.define("token", {
  user: { type: DataTypes.BOOLEAN, defaultValue: false },
  refreshToken: { type: DataTypes.STRING, allowNull: false },
});

module.exports = { TokenSchema };
