import { mongoClose, mongoConnect, mongoDrop } from "internal/database";

const drop = async () => {
  await mongoConnect();
  await mongoDrop();
  await mongoClose();
  console.log("Drop done!");
};

drop();
