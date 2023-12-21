const BaseService = require("../../core/base.service");
const { User } = require("../users/users.model");

class AuthService extends BaseService {
  constructor(name, model) {
    super(name, model);
  }

  throwIfUserExists = async (filters) => {
    const result = await this.model.findOne(filters);
    if (result) throw new HttpException(403, "User already exists");
  };
}

const authService = new AuthService("User", User);

module.exports = authService;
