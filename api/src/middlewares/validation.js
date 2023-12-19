exports.validationMiddleware = (zod) => (req, res, next) => {
  try {
    zod.parse(req.body);
    next();
  } catch (error) {
    next(error);
  }
};
