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
const upload = require("../../middlewares/upload");

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
  .post(
    upload.single("image"),
    validateUserInput(productValidator),
    productsController.createOne
  );

productsRouter
  .route("/:id")
  .all(validateObjectId)
  .put(
    upload.single("image"),
    validateUserInput(productValidator),
    productsController.updateById
  )
  .delete(productsController.deleteById);

module.exports = productsRouter;
