const BaseController = require("../../core/base.controller");
const HttpException = require("../../utils/http.exception");
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
      if (!req.file) throw new HttpException(400, "Image is required");

      await this.categoriesService.findById(req.body.category);

      const image = await this.service.uploadImage(req.file, req.body.name);

      const result = await this.service.createOne({
        ...req.body,
        image,
        createdBy: req.user._id,
      });
      res.status(200).json({ message: "Data created successfully", result });
    } catch (error) {
      next(error);
    }
  };

  updateById = async (req, res, next) => {
    try {
      const body = { ...req.body };

      await this.categoriesService.findById(req.body.category);

      if (req.file) {
        const image = await this.service.uploadImage(req.file, req.body.name);
        body.image = image;
      }

      const result = await this.service.updateById(req.params.id, {
        ...body,
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
