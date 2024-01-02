const BaseService = require("../../core/base.service");
const uploadToCloud = require("../../utils/upload");
const { Product } = require("./products.model");

class ProductsService extends BaseService {
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
        folder: "e-commerce/products",
        use_filename: true,
        tags: [name],
        resource_type: "image",
      }
    );

    return secure_url;
  };
}

const productsService = new ProductsService("Product", Product, uploadToCloud);

module.exports = productsService;
