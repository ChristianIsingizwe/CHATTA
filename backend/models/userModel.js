import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    profilePic:{
      type: String,
      default:""
    },
    tokenVersion: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  { timestamps: true, collection: "users" }
);

const User = mongoose.model("User", userSchema);

export default User;
