import jwt from "jsonwebtoken";
import { generateAccessToken } from "../utils/generateTokens";
import User from "../models/userModel.js";

const authorize = async (req, res, next) => {
  const accessToken = req.headers["authorization"]?.split(" ")[1];
  const refreshToken = req.headers["x-refresh-token"];

  if (accessToken) {
    try {
      const user = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET_KEY);
      req.user = user;
      return next();
    } catch (error) {
      console.error("Access token is invalid or expired:", error.message);
    }
  }

  if (refreshToken) {
    try {
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET_KEY
      );
      const { userId, tokenVersion } = decoded;

      const user = await User.findById(userId);
      if (!user || user.tokenVersion !== tokenVersion) {
        return res
          .status(401)
          .json({ message: "Invalid refresh token version" });
      }

      const newAccessToken = generateAccessToken({ userId: user._id });
      req.user = { userId: user._id };

      res.setHeader("Authorization", `Bearer ${newAccessToken}`);

      return next();
    } catch (error) {
      console.error("Refresh token is invalid or expired:", error.message);
      return res.status(401).json({ message: "Unauthorized" });
    }
  }

  return res.status(401).json({ message: "Unauthorized" });
};

export default authorize;
