const userService = require("../service/userService");

class UserController {
  async registration(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.registration(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (err) {
      console.log(err);
    }
  }

  async login(req, res, next) {
    try {
    } catch (err) {
      console.log(err);
    }
  }

  async logout(req, res, next) {
    try {
    } catch (err) {
      console.log(err);
    }
  }

  async activate(req, res, next) {
    try {
    } catch (err) {
      console.log(err);
    }
  }

  async refresh(req, res, next) {
    try {
    } catch (err) {
      console.log(err);
    }
  }

  async getUsers(req, res, next) {
    try {
      res.json(["123", "456"]);
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new UserController();
