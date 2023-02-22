import { mongoConnect, mongoClose, mongoDrop } from "internal/database";
import { createUserSeedData } from "core/authUser/auth-user.seeder";
import { createProductsSeedData } from "core/product/product.seeder";

const seedAllModels = async () => {
  await mongoConnect();
  await mongoDrop();
  await createUserSeedData();
  await createProductsSeedData();
  await mongoClose();
  console.log("Seeds done!");
  // TODO: Add more
};

seedAllModels();
