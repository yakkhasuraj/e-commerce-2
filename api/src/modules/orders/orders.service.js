const BaseService = require("../../core/base.service");
const { Order } = require("./orders.model");

class OrdersService extends BaseService {
  constructor(name, model) {
    super(name, model);
  }
}

const ordersService = new OrdersService("Order", Order);

module.exports = ordersService;
