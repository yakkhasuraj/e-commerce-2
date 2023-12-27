class BaseController {
  /** @type {import('./base.service')} */
  service;

  constructor(service) {
    this.service = service;
  }

  findAll = async (req, res, next) => {
    try {
      const { page, limit, field, order, projection, populate } = req.query;
      const [results, total] = await Promise.all([
        this.service.findAll({}, projection, {
          page,
          limit,
          field,
          order,
          populate,
        }),
        this.service.count({}),
      ]);
      res
        .status(200)
        .json({ message: "Data listed successfully", total, results });
    } catch (error) {
      next(error);
    }
  };

  findById = async (req, res, next) => {
    try {
      const { projection, populate } = req.query;
      const result = await this.service.findById(
        req.params.id,
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
      const result = await this.service.createOne(req.body);
      res.status(200).json({ message: "Data created successfully", result });
    } catch (error) {
      next(error);
    }
  };

  updateById = async (req, res, next) => {
    try {
      const result = await this.service.updateById(req.params.id, req.body);
      res.status(200).json({ message: "Data updated successfully", result });
    } catch (error) {
      next(error);
    }
  };

  deleteById = async (req, res, next) => {
    try {
      const result = await this.service.deleteById(req.params.id);
      res.status(200).json({ message: "Data deleted successfully", result });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = BaseController;
