const usersService = require("../modules/users/users.service");
const HttpException = require("../utils/http.exception");
const { verifyToken, getToken } = require("../utils/token");

exports.authMiddleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) throw new HttpException(401, "Token not found");

    const token = getToken(authorization);

    const decoded = await verifyToken(token);

    const user = await usersService.findById(decoded._id);
    if (user.status === "Disabled")
      throw new HttpException(401, "User not found");

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};
