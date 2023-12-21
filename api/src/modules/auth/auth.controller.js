const { hash } = require("../../utils/hash");
const authService = require("./auth.service");

class AuthController {
  service;

  constructor(service) {
    this.service = service;
  }

  signup = async (req, res, next) => {
    try {
      const { email, password, ...rest } = req.body;

      await this.service.throwIfUserExists({ email });

      const hashedPassword = await hash(password);

      const result = await this.service.createOne({
        email,
        password: hashedPassword,
        ...rest,
      });

      res.status(201).json({ message: "User signed up successfully", result });
    } catch (error) {
      next(error);
    }
  };
}

const authController = new AuthController(authService);

module.exports = authController;
