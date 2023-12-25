const HttpException = require("../utils/http.exception");

class BaseService {
  /** @type {import('mongoose').Model} */
  model;
  name;

  constructor(name, model) {
    this.name = name;
    this.model = model;
  }

  findAll = () => this.model.find();

  findById = async (id) => {
    const result = await this.model.findById(id);
    if (!result) throw new HttpException(404, `${this.name} not found`);
    return result;
  };

  createOne = (data) => this.model.create(data);

  updateById = async (id, data) => {
    const result = await this.model.findByIdAndUpdate(id, data, { new: true });
    if (!result) throw new HttpException(404, `${this.name} not found`);
    return result;
  };

  deleteById = async (id) => {
    const result = await this.model.findByIdAndDelete(id);
    if (!result) throw new HttpException(404, `${this.name} not found`);
    return result;
  };
}

module.exports = BaseService;
