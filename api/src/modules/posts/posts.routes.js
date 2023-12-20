const express = require("express");
const {
  listPost,
  createPost,
  getPostById,
  updatePost,
  deletePost,
} = require("./posts.controller");
const { validationMiddleware } = require("../../middlewares/validation");
const { postValidator } = require("./posts.validator");

const postRouter = express.Router();

postRouter
  .route("")
  .get(listPost)
  .post(validationMiddleware(postValidator), createPost);
postRouter
  .route("/:id")
  .get(getPostById)
  .put(validationMiddleware(postValidator), updatePost)
  .delete(deletePost);

module.exports = postRouter;
