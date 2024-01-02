const { z } = require("zod");
const { Types } = require("mongoose");

const productsValidator = z.object({
  product: z
    .string({ required_error: "Product is required" })
    .refine((value) => Types.ObjectId.isValid(value), {
      message: "Product must be a valid id",
    }),
  quantity: z.coerce
    .number({ required_error: "Quantity is required" })
    .positive(),
});

const cartsValidator = z
  .object({
    products: z
      .array(productsValidator, { required_error: "Products are required" })
      .nonempty({ message: "Products must contain 1 element" }),
    deal: z
      .enum(["InProgress", "Ordered"], {
        required_error: "Deal is required",
      })
      .optional(),
  })
  .strict();

module.exports = { cartsValidator };
