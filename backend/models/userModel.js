import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

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
    profilePic: {
      type: String,
      default: " https://www.gravatar.com/avatar/?d=mp",
    },
    tokenVersion: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  { timestamps: true, collection: "users" }
);

userSchema.plugin(uniqueValidator, { message: "{PATH} must be unique" });

userSchema.index({ email: 1 });
userSchema.index({ name: 1 });

const User = mongoose.model("User", userSchema);

export default User;
