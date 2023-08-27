const { UserSchema } = require("../models/models");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const mailService = require("./mailService");
const tokenService = require("./tokenService");
const UserDto = require("../dtos/userDto");

class UserService {
  async registration(email, password) {
    const candidate = await UserSchema.findOne({ where: { email } });
    if (candidate) {
      throw new Error(`Пользователь с адресом ${email} уже существует`);
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();
    const user = await UserSchema.create({
      email,
      password: hashPassword,
      activationLink,
    });
    // await mailService.activationLink(email, activationLink);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }
}

module.exports = new UserService();
