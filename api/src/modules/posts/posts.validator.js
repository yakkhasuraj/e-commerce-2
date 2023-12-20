const { z } = require("zod");

const postValidator = z
  .object({
    title: z.string({ required_error: "Title is required" }).min(3).max(100),
    description: z
      .string({ required_error: "Description is required" })
      .min(10)
      .max(2500),
  })
  .strict();

module.exports = { postValidator };
