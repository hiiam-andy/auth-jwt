const sequalize = require("../db");
const { DataTypes } = require("sequelize");

const UserSchema = sequalize.define("user", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  isActivated: { type: DataTypes.BOOLEAN, defaultValue: false },
  activationLink: { type: DataTypes.STRING },
});

const TokenSchema = sequalize.define("token", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  refreshToken: { type: DataTypes.STRING, allowNull: false },
});

UserSchema.hasOne(TokenSchema, {
  foreignKey: "userId",
  allowNull: false,
});
TokenSchema.belongsTo(UserSchema, {
  foreignKey: "userId",
  allowNull: false,
});

module.exports = { UserSchema, TokenSchema };
