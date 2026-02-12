import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  currency?: string;
  monthlyBudget?: number;
  avatar?: string;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    currency: {
      type: String,
      default: "Rs",
    },
    monthlyBudget: {
      type: Number,
      default: 0,
    },
    avatar: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

export default mongoose.model<IUser>("User", userSchema);
