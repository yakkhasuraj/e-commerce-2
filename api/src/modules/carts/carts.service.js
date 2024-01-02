const BaseService = require("../../core/base.service");
const { Cart } = require("./carts.model");

class CartsService extends BaseService {
  constructor(name, model) {
    super(name, model);
  }
}

const cartsService = new CartsService("Cart", Cart);

module.exports = cartsService;
