const express = require("express");
const cartsController = require("./carts.controller");
const { authMiddleware } = require("../../middlewares/auth");
const {
  validateUserInput,
  validateObjectId,
  validateQueryParams,
} = require("../../middlewares/validation");
const { authorizationMiddleware } = require("../../middlewares/authorization");
const {
  queryValidator,
  projectionAndPopulateValidator,
} = require("../../utils/query");
const { cartsValidator } = require("./carts.validator");

const cartsRouter = express.Router();

cartsRouter
  .route("")
  .get(validateQueryParams(queryValidator), cartsController.findAll);

cartsRouter
  .route("/:id")
  .get(
    validateObjectId,
    validateQueryParams(projectionAndPopulateValidator),
    cartsController.findById
  );

cartsRouter.use(authMiddleware, authorizationMiddleware(/* "Customer" */));

cartsRouter
  .route("")
  .post(/* validateUserInput(cartsValidator), */ cartsController.createOne);

cartsRouter
  .route("/:id")
  .put(cartsController.updateById)
  .delete(cartsController.deleteById);

module.exports = cartsRouter;