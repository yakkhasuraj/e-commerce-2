const BaseController = require("../../core/base.controller");
const usersService = require("./users.service");

class UsersController extends BaseController {
  constructor(service) {
    super(service);
  }
}

const usersController = new UsersController(usersService);

module.exports = usersController;
