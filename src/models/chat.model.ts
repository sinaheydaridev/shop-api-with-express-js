import { Schema, model } from "mongoose";

export interface ICart {
  _id: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
  text: string;
}

const chatSchema = new Schema<ICart>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const Cart = model("Chat", chatSchema);

export default Cart;
