import { Schema, model } from "mongoose";

export interface IToken {
  _id: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  token: string;
  createdAt: Date;
}

const tokenSchema = new Schema<IToken>({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 1 * 60 * 60, // this is the expiry time in seconds
  },
});

const Token = model("Token", tokenSchema);

export default Token;
