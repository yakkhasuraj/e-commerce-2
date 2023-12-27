const HttpException = require("../utils/http.exception");

exports.authorizationMiddleware =
  (roles = ["Admin"]) =>
  (req, res, next) => {
    try {
      const { role } = req.user;

      const hasAccess = roles.includes(role);
      if (!hasAccess)
        throw new HttpException(403, "User doesn't have necessary privilege");

      next();
    } catch (error) {
      next(error);
    }
  };
