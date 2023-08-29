const jwt = require("jsonwebtoken");
const { TokenSchema } = require("../models/models");

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "30m",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await TokenSchema.findOne({ where: { userId: userId } });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      await tokenData.save();
      return tokenData;
    }
    const token = await TokenSchema.create({ refreshToken });
    return token;
  }

  async removeToken(refreshToken) {
    const tokenData = await TokenSchema.destroy({
      where: { refreshToken },
    });
    return tokenData;
  }
}

module.exports = new TokenService();
