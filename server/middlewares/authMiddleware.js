const ApiError = require("../exeptions/apiError");
const tokenService = require("../service/tokenService");

module.exports = function (req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return next(ApiError.UnauthError());
    }

    const accessToken = authHeader.split(" ")[1];
    if (!accessToken) {
      return next(ApiError.UnauthError());
    }

    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      return next(ApiError.UnauthError());
    }

    req.user = userData;
    next();
  } catch (err) {
    return next(ApiError.UnauthError());
  }
};
