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

  findAll = async (req, res, next) => {
    try {
      const { _id, role } = req.user;
      const { page, limit, field, order, projection, populate } = req.query;
      const filters = role === "Customer" ? { createdBy: _id } : {};
      const [results, total] = await Promise.all([
        this.service.findAll(filters, projection, {
          page,
          limit,
          field,
          order,
          populate,
        }),
        this.service.count(filters),
      ]);
      res
        .status(200)
        .json({ message: "Data listed successfully", total, results });
    } catch (error) {
      next(error);
    }
  };

  findOwnOrder = async (req, res, next) => {
    try {
      const { projection, populate } = req.query;
      const result = await this.service.findOne(
        { createdBy: req.user._id, deal: "InProgress" },
        projection,
        populate
      );
      res.status(200).json({ message: "Data retrieved successfully", result });
    } catch (error) {
      next(error);
    }
  };

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

      const total = cart.products.reduce((acc, { product, quantity }) => {
        return acc + product.price * quantity;
      }, 0);

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

const ordersController = new OrdersController(ordersService, cartsService);

module.exports = ordersController;
