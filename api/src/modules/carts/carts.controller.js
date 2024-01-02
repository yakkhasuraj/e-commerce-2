const BaseController = require("../../core/base.controller");
const HttpException = require("../../utils/http.exception");
const productsService = require("../products/products.service");
const cartsService = require("./carts.service");

class CartsController extends BaseController {
  /** @type {import('../products/products.service')} */
  productsService;

  constructor(service, productsService) {
    super(service);

    this.productsService = productsService;
  }

  createOne = async (req, res, next) => {
    try {
      const products = await this.productsService.findAllProducts(
        req.body.products.map(({ product }) => product)
      );
      if (products.length !== req.body.products.length)
        throw new HttpException(404, "Product doesn't exist");

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

const cartsController = new CartsController(cartsService, productsService);

module.exports = cartsController;
