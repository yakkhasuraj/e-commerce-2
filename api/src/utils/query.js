const { z } = require("zod");

const projectionAndPopulateValidator = z
  .object({
    projection: z.string().array().optional(),
    populate: z.string().array().optional(),
  })
  .partial()
  .strict();

const queryValidator = z
  .object({
    page: z.coerce.number({ required_error: "Page is required" }).positive(),
    limit: z.coerce.number({ required_error: "Limit is required" }).gte(5),
    field: z.string({ required_error: "Sort field is required" }).min(3),
    order: z.enum(["1", "-1"]),
  })
  .merge(projectionAndPopulateValidator)
  .partial()
  .strict();

module.exports = { projectionAndPopulateValidator, queryValidator };
