import { Schema, model } from "mongoose";
import CartItems, { ICartItems } from "./cart-items.model";

export interface ICart {
  _id: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
  cartItems: ICartItems[];
  totalPrice: number;
}

const cartSchema = new Schema<ICart>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cartItems: [CartItems],
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const Cart = model("Cart", cartSchema);

export default Cart;
