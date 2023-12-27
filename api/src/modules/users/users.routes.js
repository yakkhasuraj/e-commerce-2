const express = require("express");
const usersController = require("./users.controller");
const { authMiddleware } = require("../../middlewares/auth");
const { authorizationMiddleware } = require("../../middlewares/authorization");
const { validateObjectId } = require("../../middlewares/validation");

const usersRouter = express.Router();

usersRouter.use(authMiddleware);
usersRouter.route("/me").get(usersController.findMe);

usersRouter.use(authorizationMiddleware());

usersRouter.route("").get(usersController.findAll);
usersRouter.route("/:id").get(validateObjectId, usersController.findById);

module.exports = usersRouter;
