import User from "../models/userModel";

const findUsers = async (req, res) => {
  try {
    const { error, value } = validatePagination(req);

    if (error) {
      return res
        .status(400)
        .json({ message: "Invalid query parameters.", error: error.details });
    }

    const { page, limit } = value;
    const skip = (page - 1) * limit;

    const users = await User.find()
      .skip(skip)
      .limit(limit)
      .select("name email");
    res.status(200).json(users);
  } catch (error) {
    console.error("An error occurred: ", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const findUser = async (req, res) => {
  try {
    const userID = req.params.id;

    if (!userID) {
      return res.status(400).json({ message: "UserID not found" });
    }

    const user = User.findById(userID);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.error("An error occurred: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { findUser, findUsers };
