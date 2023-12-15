import { faker } from "@faker-js/faker";

const { commerce, database, helpers, image, number } = faker;

export const createRandomProducts = () => {
  return {
    _id: database.mongodbObjectId(),
    name: commerce.productName(),
    description: commerce.productDescription(),
    tags: [commerce.productAdjective(), commerce.productAdjective()],
    price: parseFloat(commerce.price()),
    category: commerce.department(),
    quantity: number.int(),
    image: image.url(),
    rating: number.float({ max: 5, min: 1, precision: 0.1 }),
  };
};

export const PRODUCTS = helpers.multiple(createRandomProducts, {
  count: 12,
});
