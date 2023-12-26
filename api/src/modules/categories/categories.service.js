const BaseService = require("../../core/base.service");
const { Category } = require("./categories.model");

class CategoriesService extends BaseService {
  constructor(name, model) {
    super(name, model);
  }
}

const categoriesService = new CategoriesService("Category", Category);

module.exports = categoriesService;
