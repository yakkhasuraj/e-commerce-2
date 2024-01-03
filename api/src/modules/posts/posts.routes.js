const express = require("express");
const postsController = require("./posts.controller");
const {
  validateUserInput,
  validateObjectId,
} = require("../../middlewares/validation");
const { postValidator } = require("./posts.validator");

const postsRouter = express.Router();

postsRouter
  .route("")
  .get(postsController.findAll)
  .post(validateUserInput(postValidator), postsController.createOne);
postsRouter
  .route("/:id")
  .all(validateObjectId)
  .get(postsController.findById)
  .put(validateUserInput(postValidator), postsController.updateById)
  .delete(postsController.deleteById);

module.exports = postsRouter;
