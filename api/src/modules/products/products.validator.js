const { z } = require("zod");
const { Types } = require("mongoose");

const productValidator = z
  .object({
    name: z.string({ required_error: "Name is required" }).min(3).max(100),
    image: z.string({ required_error: "Image is required" }).url(),
    description: z
      .string({ required_error: "Description is required" })
      .min(10)
      .max(2500),
    tags: z.string({ required_error: "Tag is required" }).array(),
    price: z.coerce.number({ required_error: "Price is required" }).gte(100),
    quantity: z.coerce
      .number({ required_error: "Quantity is required" })
      .positive(),
    rating: z.coerce
      .number({ required_error: "Quantity is required" })
      .gte(1)
      .lte(5),
    category: z
      .string({ required_error: "Category is required" })
      .refine((value) => Types.ObjectId.isValid(value), {
        message: "Category must be a valid id",
      }),
  })
  .strict();

module.exports = { productValidator };
