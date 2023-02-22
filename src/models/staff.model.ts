import { Gender } from "enums";
import { Schema, model } from "mongoose";

export interface IUser {
  _id: Schema.Types.ObjectId;
  username: string;
  email: string;
  password: string;
  mobileNumber: string;
  birthYear: number;
  skillSet: any;
  isVerifyEmail: boolean;
  profileImage: string;
  gender: Gender;
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const User = model("User", userSchema);

export default User;
