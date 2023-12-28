const BaseController = require("../../core/base.controller");
const categoriesService = require("./categories.service");

class CategoriesController extends BaseController {
  constructor(service) {
    super(service);
  }

  createOne = async (req, res, next) => {
    try {
      // const result = await this.service.createOne({
      //   ...req.body,
      //   createdBy: req.user._id,
      // });
      res
        .status(200)
        .json({ message: "Data created successfully", result: {} });
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

const categoriesController = new CategoriesController(categoriesService);

module.exports = categoriesController;
