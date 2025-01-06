import bcrypt from "bcrypt";

const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.error("Error hashing the password: ", error);
    throw new Error("Password hashing failed.");
  }
};

const verifyPassword = async (plainPassword, hashedPassword) => {
  try {
    return await bcrypt.compare(plainPassword, hashedPassword);
  } catch (error) {
    console.error("Error while verifying the password: ", error);
    throw new Error("Verifying password failed");
  }
};

export { hashPassword, verifyPassword };
