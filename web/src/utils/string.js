import { hexRegex } from "@/configs";

export const isMongoId = (id) => id.match(hexRegex);
