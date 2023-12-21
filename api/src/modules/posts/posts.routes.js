const express = require("express");
const postsController = require("./posts.controller");
const { validationMiddleware } = require("../../middlewares/validation");
const { postValidator } = require("./posts.validator");

const postsRouter = express.Router();

postsRouter
  .route("")
  .get(postsController.findAll)
  .post(validationMiddleware(postValidator), postsController.createOne);
postsRouter
  .route("/:id")
  .get(postsController.findById)
  .put(validationMiddleware(postValidator), postsController.updateById)
  .delete(postsController.deleteById);

module.exports = postsRouter;
