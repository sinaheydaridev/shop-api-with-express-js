import Product from "models/product.model";

export const createProductsSeedData = async () => {
  await Product.create({
    title: "This is product",
    description: "This is description",
    image: "image.jpg",
    price: 2000,
    colors: [],
  });
};
