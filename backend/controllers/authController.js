import Joi from "joi";
import User from "../models/userModel.js";
import { hashPassword, verifyPassword } from "../utils/passwordHelper.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateTokens.js";

const userRegisterSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .required(),
  confirmPassword: Joi.string()
    .min(8)
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .required(),
});

const userSignInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .required(),
});

const validatePagination = (req) => {
  const schema = Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(10).default(10),
  });

  return schema.validate(req.query);
};

const registerUser = async (req, res) => {
  try {
    const { error, value } = userRegisterSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
      return res.status(400).json({ errors: errorMessages });
    }

    const { name, email, password, confirmPassword } = value;
    if (password !== confirmPassword){
      return res.status(400).json({messages: "Passwords don't match"})
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ messages: "User already exist" });
    }
    const hashedPassword = hashPassword(password);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const accessToken = generateAccessToken(newUser._id);
    const refreshToken = generateRefreshToken(
      newUser._id,
      newUser.tokenVersion
    );

    res.status(201).json({ name, email, accessToken, refreshToken });
  } catch (error) {
    console.error("An error occurred: ", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const signInUser = async (req, res) => {
  try {
    const { error, value } = userSignInSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
      return res.status(400).json({ errors: errorMessages });
    }

    const { email, password } = value;
    const user = User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordCorrect = verifyPassword(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id, user.tokenVersion);

    res
      .status(200)
      .json({ name: user.name, email: user.email, accessToken, refreshToken });
  } catch (error) {
    console.error("An error occurred: ", error);
    res.status(500).json({ message: "Internal server error." });
  }
};


export { registerUser, signInUser };
