const express = require("express");
const authController = require("./auth.controller");
const { validateUserInput } = require("../../middlewares/validation");
const { signupValidator, loginValidator } = require("./auth.validator");

const authRouter = express.Router();

authRouter
  .route("/signup")
  .post(validateUserInput(signupValidator), authController.signup);

authRouter
  .route("/login")
  .post(validateUserInput(loginValidator), authController.login);

module.exports = authRouter;
