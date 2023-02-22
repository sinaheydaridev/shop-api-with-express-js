import { Schema, model } from "mongoose";

export interface IProduct {
  _id: Schema.Types.ObjectId;
  title: string;
  description: string;
  price: number;
  image: string;
  colors: any;
}

const productSchema = new Schema<IProduct>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    colors: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const Product = model("Product", productSchema);

export default Product;
