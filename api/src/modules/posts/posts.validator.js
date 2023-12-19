const { z } = require("zod");

const postValidator = z.object({
  id: z.number({ required_error: "Id is required" }).int().positive(),
  title: z.string({ required_error: "Title is required" }).min(3).max(100),
  description: z
    .string({ required_error: "Description is required" })
    .min(10)
    .max(2500),
});

module.exports = { postValidator };
