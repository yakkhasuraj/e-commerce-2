const { z } = require("zod");
const { Types } = require("mongoose");

const orderValidator = z
  .object({
    cart: z
      .string({ required_error: "Cart is required" })
      .refine((value) => Types.ObjectId.isValid(value), {
        message: "Cart must be a valid id",
      }),
    deal: z
      .enum(["InProgress", "Completed"], {
        required_error: "Deal is required",
      })
      .optional(),
  })
  .strict();

const orderStatusValidator = z
  .object({
    deal: z.enum(["InProgress", "Completed"], {
      required_error: "Deal is required",
    }),
  })
  .strict();

module.exports = { orderValidator, orderStatusValidator };
