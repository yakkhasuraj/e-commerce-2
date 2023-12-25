const express = require("express");
const usersController = require("./users.controller");
const { authMiddleware } = require("../../middlewares/auth");

const usersRouter = express.Router();

usersRouter.route("").get(authMiddleware, usersController.findAll);
usersRouter.route("/:id").get(usersController.findById);

module.exports = usersRouter;
