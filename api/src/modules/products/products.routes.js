const express = require("express");
const productsController = require("./products.controller");
const { authMiddleware } = require("../../middlewares/auth");
const {
  validateUserInput,
  validateObjectId,
  validateQueryParams,
} = require("../../middlewares/validation");
const { productValidator } = require("./products.validator");
const { authorizationMiddleware } = require("../../middlewares/authorization");
const {
  queryValidator,
  projectionAndPopulateValidator,
} = require("../../utils/query");

const productsRouter = express.Router();

productsRouter
  .route("")
  .get(validateQueryParams(queryValidator), productsController.findAll);

productsRouter
  .route("/:id")
  .get(
    validateObjectId,
    validateQueryParams(projectionAndPopulateValidator),
    productsController.findById
  );

productsRouter.use(authMiddleware, authorizationMiddleware());

productsRouter
  .route("")
  .post(validateUserInput(productValidator), productsController.createOne);

productsRouter
  .route("/:id")
  .put(validateUserInput(productValidator), productsController.updateById)
  .delete(productsController.deleteById);

module.exports = productsRouter;
