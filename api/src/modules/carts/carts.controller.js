const BaseController = require("../../core/base.controller");
const cartsService = require("./carts.service");

class CartsController extends BaseController {
  constructor(service) {
    super(service);
  }

  findOwnCart = async (req, res, next) => {
    try {
      const { projection, populate } = req.query;
      const result = await this.service.findOne(
        {
          createdBy: req.user._id,
          deal: "InProgress",
        },
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
      await this.service.throwIfProductIsMissing(
        req.body.products.map(({ product }) => product)
      );

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
      await this.service.throwIfProductIsMissing(
        req.body.products.map(({ product }) => product)
      );

      const result = await this.service.updateById(req.params.id, {
        ...req.body,
        updatedBy: req.user._id,
      });
      res.status(200).json({ message: "Data updated successfully", result });
    } catch (error) {
      next(error);
    }
  };

  updateOwnCart = async (req, res, next) => {
    try {
      await this.service.throwIfProductIsMissing(
        req.body.products.map(({ product }) => product)
      );

      const result = await this.service.updateOne(
        { createdBy: req.user._id, deal: "InProgress" },
        { ...req.body, updatedBy: req.user._id }
      );
      res.status(200).json({ message: "Data updated successfully", result });
    } catch (error) {
      next(error);
    }
  };

  deleteOwnCart = async (req, res, next) => {
    try {
      const result = await this.service.deleteOne({
        createdBy: req.user._id,
        deal: "InProgress",
      });
      res.status(200).json({ message: "Data deleted successfully", result });
    } catch (error) {
      next(error);
    }
  };
}

const cartsController = new CartsController(cartsService);

module.exports = cartsController;
