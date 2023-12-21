const express = require("express");
const usersController = require("./users.controller");

const usersRouter = express.Router();

usersRouter.route("").get(usersController.findAll);
usersRouter.route("/:id").get(usersController.findById);

module.exports = usersRouter;
