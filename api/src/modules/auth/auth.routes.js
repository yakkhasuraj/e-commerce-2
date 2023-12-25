const express = require("express");
const authController = require("./auth.controller");
const { validationMiddleware } = require("../../middlewares/validation");
const { signupValidator, loginValidator } = require("./auth.validator");

const authRouter = express.Router();

authRouter
  .route("/signup")
  .post(validationMiddleware(signupValidator), authController.signup);

authRouter
  .route("/login")
  .post(validationMiddleware(loginValidator), authController.login);

module.exports = authRouter;
