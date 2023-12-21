const express = require("express");
const authController = require("./auth.controller");
const { validationMiddleware } = require("../../middlewares/validation");
const { signupValidator } = require("./auth.validator");

const authRouter = express.Router();

authRouter
  .route("/signup")
  .post(validationMiddleware(signupValidator), authController.signup);

module.exports = authRouter;
