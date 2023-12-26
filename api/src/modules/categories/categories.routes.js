const express = require("express");
const categoriesController = require("./categories.controller");
const { authMiddleware } = require("../../middlewares/auth");
const {
  validateUserInput,
  validateObjectId,
} = require("../../middlewares/validation");
const { categoryValidator } = require("./categories.validator");

const categoriesRouter = express.Router();

categoriesRouter.route("").get(categoriesController.findAll);

categoriesRouter
  .route("/:id")
  .get(validateObjectId, categoriesController.findById);

categoriesRouter.use(authMiddleware);

categoriesRouter
  .route("")
  .post(validateUserInput(categoryValidator), categoriesController.createOne);

categoriesRouter
  .route("/:id")
  .put(validateUserInput(categoryValidator), categoriesController.updateById)
  .delete(categoriesController.deleteById);

module.exports = categoriesRouter;
