const express = require("express");
const ordersController = require("./orders.controller");
const { authMiddleware } = require("../../middlewares/auth");
const { authorizationMiddleware } = require("../../middlewares/authorization");
const {
  validateObjectId,
  validateQueryParams,
  validateUserInput,
} = require("../../middlewares/validation");
const {
  projectionAndPopulateValidator,
  queryValidator,
} = require("../../utils/query");
const { orderValidator } = require("./orders.validator");

const ordersRouter = express.Router();

ordersRouter.use(authMiddleware);

ordersRouter
  .route("")
  .post(
    authorizationMiddleware("Customer"),
    validateUserInput(orderValidator),
    ordersController.createOne
  );

ordersRouter.use(authorizationMiddleware());

ordersRouter
  .route("")
  .get(validateQueryParams(queryValidator), ordersController.findAll);

ordersRouter
  .route("/:id")
  .all(validateObjectId)
  .get(
    validateQueryParams(projectionAndPopulateValidator),
    ordersController.findById
  )
  .put(ordersController.updateById)
  .delete(ordersController.deleteById);

module.exports = ordersRouter;
