class BaseController {
  /** @type {import('./base.service')} */
  service;

  constructor(service) {
    this.service = service;
  }

  findAll = async (req, res, next) => {
    try {
      const results = await this.service.findAll();
      res.status(200).json({ message: "Data listed successfully", results });
    } catch (error) {
      next(error);
    }
  };

  findById = async (req, res, next) => {
    try {
      const result = await this.service.findById(req.params.id);
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
