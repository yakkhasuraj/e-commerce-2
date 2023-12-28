const BaseController = require("../../core/base.controller");
const categoriesService = require("../categories/categories.service");
const productsService = require("./products.service");

class ProductsController extends BaseController {
  /** @type {import('../categories/categories.service')} */
  categoriesService;

  constructor(service, categoriesService) {
    super(service);
    this.categoriesService = categoriesService;
  }

  createOne = async (req, res, next) => {
    try {
      await this.categoriesService.findById(req.body.category);

      const result = await this.service.createOne({
        ...req.body,
        createdBy: req.user._id,
      });
      res.status(200).json({ message: "Data created successfully", result });
    } catch (error) {
      next(error);
    }
  };

  updateById = async (req, res, next) => {
    try {
      await this.categoriesService.findById(req.body.category);

      const result = await this.service.updateById(req.params.id, {
        ...req.body,
        updatedBy: req.user._id,
      });
      res.status(200).json({ message: "Data updated successfully", result });
    } catch (error) {
      next(error);
    }
  };
}

const productsController = new ProductsController(
  productsService,
  categoriesService
);

module.exports = productsController;
