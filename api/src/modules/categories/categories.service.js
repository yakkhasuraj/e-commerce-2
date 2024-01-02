const BaseService = require("../../core/base.service");
const uploadToCloud = require("../../utils/upload");
const { Category } = require("./categories.model");

class CategoriesService extends BaseService {
  uploadService;

  constructor(name, model, uploadService) {
    super(name, model);

    this.uploadService = uploadService;
  }

  uploadImage = async (file, name) => {
    const { mimetype, buffer } = file;
    const base64 = buffer.toString("base64");

    const { secure_url } = await this.uploadService(
      `data:${mimetype};base64,${base64}`,
      {
        folder: "e-commerce/category",
        use_filename: true,
        tags: [name],
        resource_type: "image",
      }
    );

    return secure_url;
  };
}

const categoriesService = new CategoriesService(
  "Category",
  Category,
  uploadToCloud
);

module.exports = categoriesService;
