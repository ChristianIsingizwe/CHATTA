import jwt from "jsonwebtoken";

const generateAccessToken = (payload) => {
  try {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET_KEY, {
      expiresIn: "20min",
    });
  } catch (error) {
    console.error("Error while generating the access token:", error);
    throw new Error("Failed to generate access token");
  }
};

const generateRefreshToken = (payload, tokenVersion) => {
  try {
    const refreshPayload = { ...payload, tokenVersion };
    return jwt.sign(refreshPayload, process.env.REFRESH_TOKEN_SECRET_KEY, {
      expiresIn: "14d",
    });
  } catch (error) {
    console.error("Failed to generate a refresh token: ", error);
    throw new Error("Failed to generate an access token. ");
  }
};

export { generateAccessToken, generateRefreshToken };
