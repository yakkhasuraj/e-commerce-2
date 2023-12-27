const BaseController = require("../../core/base.controller");
const usersService = require("./users.service");

class UsersController extends BaseController {
  constructor(service) {
    super(service);
  }

  findMe = async (req, res, next) => {
    try {
      res
        .status(200)
        .json({ message: "Data retrieved successfully", result: req.user });
    } catch (error) {
      next(error);
    }
  };
}

const usersController = new UsersController(usersService);

module.exports = usersController;
