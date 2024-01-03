const BaseController = require("../../core/base.controller");
const HttpException = require("../../utils/http.exception");
const cartsService = require("../carts/carts.service");
const ordersService = require("./orders.service");

class OrdersController extends BaseController {
  /** @type {import('../carts/carts.service')} */
  cartsService;

  constructor(service, cartsService) {
    super(service);

    this.cartsService = cartsService;
  }

  createOne = async (req, res, next) => {
    try {
      const cart = await this.cartsService.updateById(
        req.body.cart,
        {
          deal: "Ordered",
        },
        { beforeUpdate: false, populate: ["products.product"] }
      );
      if (cart.deal === "Ordered")
        throw new HttpException(400, "Order already placed");

      const total = 1000;

      const result = await this.service.createOne({
        ...req.body,
        total,
        createdBy: req.user._id,
      });
      res.status(200).json({ message: "Data created successfully", result });
    } catch (error) {
      next(error);
    }
  };
}

const ordersController = new OrdersController(ordersService, cartsService);

module.exports = ordersController;
