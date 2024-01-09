import { hexRegex } from "@/configs";
import { z } from "zod";

export const productEntryValidator = z.object({
  name: z.string().min(3).max(20).trim(),
  description: z.string().min(100).max(2500),
  tags: z.array(z.string()).min(1).max(5),
  price: z.number().gte(100).lte(100_000),
  category: z.string().regex(hexRegex),
  quantity: z.number().int().gte(5).lte(1000),
  image: z.string().url(),
  rating: z.number().gte(1).lte(5),
});
