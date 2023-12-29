const { z } = require("zod");

const categoryValidator = z
  .object({
    name: z.string({ required_error: "Name is required" }).min(3).max(100),
    // image: z.string({ required_error: "Image is required" }).url(),
    description: z
      .string({ required_error: "Description is required" })
      .min(10)
      .max(2500),
  })
  .strict();

module.exports = { categoryValidator };
