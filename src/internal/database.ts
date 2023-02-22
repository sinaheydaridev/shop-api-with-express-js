import mongoose from "mongoose";
// config
import { config } from "config";

export const mongoConnect = () => {
  mongoose.set("strictQuery", true);
  return mongoose
    .connect(config.MONGO_CONNECTION_URI as string)
    .then(() => {
      console.log("Connected mongoDB!");
    })
    .catch((error) => console.log(`Error connecting to mongoDB ${error}`));
};

export const mongoClose = async () => {
  await mongoose.connection
    .close()
    .then(() => {
      console.log("Closed mongoDB!");
    })
    .catch((error) => {
      console.log(error);
    });
};

export const mongoDrop = async () => {
  await mongoose.connection
    .dropDatabase()
    .then(() => {
      console.log("Dropped mongoDB!");
    })
    .catch((error) => {
      console.log(error);
    });
};
