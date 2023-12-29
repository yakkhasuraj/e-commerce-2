const BaseController = require("../../core/base.controller");
const categoriesService = require("./categories.service");
const uploadToCloud = require("../../utils/upload");
const HttpException = require("../../utils/http.exception");

class CategoriesController extends BaseController {
  uploadService;

  constructor(service, uploadService) {
    super(service);

    this.uploadService = uploadService;
  }

  createOne = async (req, res, next) => {
    try {
      if (!req.file) throw new HttpException(400, "Image is required");

      const { mimetype, buffer } = req.file;
      const base64 = buffer.toString("base64");

      const { secure_url } = await this.uploadService(
        `data:${mimetype};base64,${base64}`,
        {
          folder: "e-commerce/category",
          use_filename: true,
          tags: [req.body.name],
          resource_type: "image",
        }
      );

      const result = await this.service.createOne({
        ...req.body,
        image: secure_url,
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

const categoriesController = new CategoriesController(
  categoriesService,
  uploadToCloud
);

module.exports = categoriesController;
