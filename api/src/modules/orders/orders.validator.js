const { z } = require("zod");
const { Types } = require("mongoose");

const orderValidator = z
  .object({
    cart: z
      .string({ required_error: "Cart is required" })
      .refine((value) => Types.ObjectId.isValid(value), {
        message: "Cart must be a valid id",
      }),
  })
  .strict();

module.exports = { orderValidator };
