const BaseController = require("../../core/base.controller");
const categoriesService = require("./categories.service");
const uploadToCloud = require("../../utils/upload");
const HttpException = require("../../utils/http.exception");

class CategoriesController extends BaseController {
  constructor(service) {
    super(service);
  }

  createOne = async (req, res, next) => {
    try {
      if (!req.file) throw new HttpException(400, "Image is required");

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

const categoriesController = new CategoriesController(categoriesService);

module.exports = categoriesController;
