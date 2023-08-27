const sequalize = require("../db");
const { DataTypes } = require("sequelize");

const UserSchema = sequalize.define("user", {
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  isActivated: { type: DataTypes.BOOLEAN, defaultValue: false },
  activationLink: { type: DataTypes.STRING },
});

const TokenSchema = sequalize.define("token", {
  refreshToken: { type: DataTypes.STRING, allowNull: false },
});

UserSchema.hasOne(TokenSchema);
TokenSchema.belongsTo(UserSchema);

module.exports = { UserSchema, TokenSchema };
