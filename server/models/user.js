import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Must be a valid username"],
    },
    password: {
      type: String,
      required: [true, "User must have a password"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Must be unique Email"],
      unique: true,
    },
    city: { type: String, default: "" },
    state: { type: String, default: "" },
    phone: { type: String, default: "" },
    contacted: { type: String, default: "" },
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);
export default User;
