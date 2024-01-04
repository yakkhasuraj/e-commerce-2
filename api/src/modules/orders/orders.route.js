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
const { orderValidator, orderStatusValidator } = require("./orders.validator");

const ordersRouter = express.Router();

ordersRouter.use(authMiddleware);

ordersRouter
  .route("")
  .get(validateQueryParams(queryValidator), ordersController.findAll);

ordersRouter
  .route("")
  .post(
    authorizationMiddleware("Customer"),
    validateUserInput(orderValidator),
    ordersController.createOne
  );

ordersRouter
  .route("/own")
  .all(authorizationMiddleware("Customer"))
  .get(ordersController.findOwnOrder);

ordersRouter.use(authorizationMiddleware());

ordersRouter
  .route("/:id")
  .all(validateObjectId)
  .get(
    validateQueryParams(projectionAndPopulateValidator),
    ordersController.findById
  )
  .patch(validateUserInput(orderStatusValidator), ordersController.updateById)
  .delete(ordersController.deleteById);

module.exports = ordersRouter;
