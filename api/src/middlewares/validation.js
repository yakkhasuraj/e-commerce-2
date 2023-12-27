const { Types } = require("mongoose");
const HttpException = require("../utils/http.exception");

exports.validateQueryParams = (zod) => (req, res, next) => {
  try {
    zod.parse(req.query);
    next();
  } catch (error) {
    next(error);
  }
};

exports.validateUserInput = (zod) => (req, res, next) => {
  try {
    zod.parse(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

exports.validateObjectId = (req, res, next) => {
  try {
    const isObjectId = Types.ObjectId.isValid(req.params.id);
    if (!isObjectId) throw new HttpException(400, "Please use a valid id");

    next();
  } catch (error) {
    next(error);
  }
};
