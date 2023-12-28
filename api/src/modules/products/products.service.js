const BaseService = require("../../core/base.service");
const { Product } = require("./products.model");

class ProductsService extends BaseService {
  constructor(name, model) {
    super(name, model);
  }
}

const productsService = new ProductsService("Product", Product);

module.exports = productsService;
