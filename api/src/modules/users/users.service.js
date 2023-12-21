const BaseService = require("../../core/base.service");
const { User } = require("./users.model");

class UsersService extends BaseService {
  constructor(name, model) {
    super(name, model);
  }
}

const usersService = new UsersService("User", User);

module.exports = usersService;
