const HttpException = require("../utils/http.exception");

class BaseService {
  /** @type {import('mongoose').Model} */
  model;
  name;

  constructor(name, model) {
    this.name = name;
    this.model = model;
  }

  findAll = (filters, projection, options) => {
    const {
      page = 1,
      limit = 10,
      field = "createdAt",
      order = 1,
      populate,
    } = options;
    const skip = (page - 1) * limit;
    return this.model.find(filters, projection, {
      limit,
      skip,
      sort: { [field]: parseInt(order) },
      populate,
      lean: true,
    });
  };

  count = (filters) => this.model.countDocuments(filters, { lean: true });

  findById = async (id, projection, populate) => {
    const result = await this.model.findById(id, projection, {
      populate,
      lean: true,
    });
    if (!result) throw new HttpException(404, `${this.name} not found`);
    return result;
  };

  findOne = async (filters, projection, populate) => {
    const result = await this.model.findOne(filters, projection, {
      populate,
      lean: true,
    });
    if (!result) throw new HttpException(404, `${this.name} not found`);
    return result;
  };

  createOne = (data) => this.model.create(data);

  updateById = async (id, data, options = {}) => {
    const { projection, populate, beforeUpdate = true } = options;
    const result = await this.model.findByIdAndUpdate(id, data, {
      new: beforeUpdate,
      lean: true,
      projection,
      populate,
    });
    if (!result) throw new HttpException(404, `${this.name} not found`);
    return result;
  };

  updateOne = async (filters, data) => {
    const result = await this.model.findOneAndUpdate(filters, data, {
      new: true,
      lean: true,
    });
    if (!result) throw new HttpException(404, `${this.name} not found`);
    return result;
  };

  deleteById = async (id) => {
    const result = await this.model.findByIdAndDelete(id, { lean: true });
    if (!result) throw new HttpException(404, `${this.name} not found`);
    return result;
  };

  deleteOne = async (filters) => {
    const result = await this.model.findOneAndDelete(filters, { lean: true });
    if (!result) throw new HttpException(404, `${this.name} not found`);
    return result;
  };
}

module.exports = BaseService;
