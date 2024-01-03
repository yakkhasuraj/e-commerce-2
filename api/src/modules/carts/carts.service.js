const BaseService = require("../../core/base.service");
const HttpException = require("../../utils/http.exception");
const productsService = require("../products/products.service");
const { Cart } = require("./carts.model");

class CartsService extends BaseService {
  /** @type {import('../products/products.service')} */
  productsService;

  constructor(name, model, productsService) {
    super(name, model);

    this.productsService = productsService;
  }

  throwIfProductIsMissing = async (products) => {
    const availableProducts = await this.productsService.findAllProducts(
      products
    );
    if (availableProducts.length !== products.length)
      throw new HttpException(404, "Product doesn't exist");
  };
}

const cartsService = new CartsService("Cart", Cart, productsService);

module.exports = cartsService;
