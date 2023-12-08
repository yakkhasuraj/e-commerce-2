import { z, ZodError } from "zod";

export const loginValidator = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(20),
  rememberMe: z.boolean(),
});

export const signupValidator = z
  .object({
    firstName: z.string().min(3).max(20).trim(),
    lastName: z.string().min(3).max(20).trim(),
    email: z.string().email(),
    password: z.string().min(8).max(20),
    confirmPassword: z.string().min(8).max(20),
    termsAndConditions: z.boolean(),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
