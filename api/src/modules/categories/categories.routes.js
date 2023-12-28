const express = require("express");
const categoriesController = require("./categories.controller");
const { authMiddleware } = require("../../middlewares/auth");
const {
  validateUserInput,
  validateObjectId,
  validateQueryParams,
} = require("../../middlewares/validation");
const { categoryValidator } = require("./categories.validator");
const { authorizationMiddleware } = require("../../middlewares/authorization");
const {
  queryValidator,
  projectionAndPopulateValidator,
} = require("../../utils/query");
const upload = require("../../middlewares/upload");

const categoriesRouter = express.Router();

categoriesRouter
  .route("")
  .get(validateQueryParams(queryValidator), categoriesController.findAll);

categoriesRouter
  .route("/:id")
  .get(
    validateObjectId,
    validateQueryParams(projectionAndPopulateValidator),
    categoriesController.findById
  );

categoriesRouter.use(authMiddleware, authorizationMiddleware());

categoriesRouter.route("").post(
  upload.single("image"),
  // validateUserInput(categoryValidator),
  categoriesController.createOne
);

categoriesRouter
  .route("/:id")
  .put(validateUserInput(categoryValidator), categoriesController.updateById)
  .delete(categoriesController.deleteById);

module.exports = categoriesRouter;
