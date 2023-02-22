import { Schema, model } from "mongoose";

export interface ICartItems {
  _id: Schema.Types.ObjectId;
  product: Schema.Types.ObjectId;
  price: number;
  quantity: number;
}

const cartSchema = new Schema<ICartItems>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const CartItems = model("CartItems", cartSchema);

export default CartItems;
