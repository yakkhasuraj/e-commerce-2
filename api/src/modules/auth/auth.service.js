const BaseService = require("../../core/base.service");
const HttpException = require("../../utils/http.exception");
const { User } = require("../users/users.model");

class AuthService extends BaseService {
  constructor(name, model) {
    super(name, model);
  }

  throwIfUserExists = async (filters) => {
    const result = await this.model.findOne(filters);
    if (result) throw new HttpException(403, "User already exists");
  };

  findUser = async (filters) => {
    const result = await this.model.findOne(filters, [
      "email",
      "password",
      "role",
      "status",
    ]);
    if (!result)
      throw new HttpException(401, "Email or password doesn't match");
    return result;
  };
}

const authService = new AuthService("User", User);

module.exports = authService;
