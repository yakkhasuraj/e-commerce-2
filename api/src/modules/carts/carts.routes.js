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

cartsRouter.use(authMiddleware);

cartsRouter
  .route("")
  .post(
    authorizationMiddleware("Customer"),
    validateUserInput(cartsValidator),
    cartsController.createOne
  );

cartsRouter
  .route("/own")
  .all(authorizationMiddleware("Customer"))
  .get(cartsController.findOwnCart)
  .put(validateUserInput(cartsValidator), cartsController.updateOwnCart)
  .delete(cartsController.deleteOwnCart);

cartsRouter.use(authorizationMiddleware());

cartsRouter
  .route("")
  .get(validateQueryParams(queryValidator), cartsController.findAll);

cartsRouter
  .route("/:id")
  .all(validateObjectId)
  .get(
    validateQueryParams(projectionAndPopulateValidator),
    cartsController.findById
  )
  .put(validateUserInput(cartsValidator), cartsController.updateById)
  .delete(cartsController.deleteById);

module.exports = cartsRouter;
