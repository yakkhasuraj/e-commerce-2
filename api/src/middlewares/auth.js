const usersService = require("../modules/users/users.service");
const HttpException = require("../utils/http.exception");
const { verifyToken, getToken } = require("../utils/token");

exports.authMiddleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) throw new HttpException(404, "Token not found");

    const token = getToken(authorization);

    const decoded = await verifyToken(token);

    await usersService.findById(decoded._id);

    // TODO: Check if user is disabled

    next();
  } catch (error) {
    next(error);
  }
};
