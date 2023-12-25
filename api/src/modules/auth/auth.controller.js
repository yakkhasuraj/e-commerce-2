const { verify } = require("../../utils/hash");
const HttpException = require("../../utils/http.exception");
const authService = require("./auth.service");

class AuthController {
  service;

  constructor(service) {
    this.service = service;
  }

  signup = async (req, res, next) => {
    try {
      const { email } = req.body;

      await this.service.throwIfUserExists({ email });

      const result = await this.service.createOne(req.body);

      res.status(201).json({ message: "User signed up successfully", result });
    } catch (error) {
      next(error);
    }
  };

  login = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const user = await this.service.findUser({ email });

      const isVerified = await verify(user.password, password);
      if (!isVerified)
        throw new HttpException(401, "Email or password doesn't match");

      res.status(201).json({ message: "User logged in successfully" });
    } catch (error) {
      next(error);
    }
  };
}

const authController = new AuthController(authService);

module.exports = authController;
