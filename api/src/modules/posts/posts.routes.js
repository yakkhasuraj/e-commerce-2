const express = require("express");
const postsController = require("./posts.controller");
const { validationMiddleware } = require("../../middlewares/validation");
const { postValidator } = require("./posts.validator");

const postRouter = express.Router();

postRouter
  .route("")
  .get(postsController.findAll)
  .post(validationMiddleware(postValidator), postsController.createOne);
postRouter
  .route("/:id")
  .get(postsController.findById)
  .put(validationMiddleware(postValidator), postsController.updateById)
  .delete(postsController.deleteById);

module.exports = postRouter;
