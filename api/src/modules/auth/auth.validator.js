const { z } = require("zod");
const { passwordRegex } = require("../../configs/regex");

const signupValidator = z
  .object({
    firstName: z
      .string({ required_error: "First name is required" })
      .min(3)
      .max(100)
      .trim(),
    lastName: z
      .string({ required_error: "Last name is required" })
      .min(3)
      .max(100)
      .trim(),
    email: z
      .string({ required_error: "Email is required" })
      .email()
      .trim()
      .toLowerCase(),
    password: z
      .string({ required_error: "Password is required" })
      .regex(passwordRegex, {
        message:
          "Password must has at least 8 characters, one uppercase letter, one lower case letter, on digit and one special character",
      }),
    dateOfBirth: z.coerce.date({ required_error: "Date of birth is required" }),
  })
  .strict();

const loginValidator = z
  .object({
    email: z
      .string({ required_error: "Email is required" })
      .email()
      .trim()
      .toLowerCase(),
    password: z
      .string({ required_error: "Password is required" })
      .regex(passwordRegex, {
        message:
          "Password must has at least 8 characters, one uppercase letter, one lower case letter, on digit and one special character",
      }),
    rememberMe: z.boolean().optional(),
  })
  .strict();

module.exports = { signupValidator, loginValidator };
