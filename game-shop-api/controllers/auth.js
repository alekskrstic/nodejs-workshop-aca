import User from "../models/user.js";

export const logIn = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();

    res.status(200).json({
      message: "User logged in successfully!",
      user: user,
      token: token,
    });
  } catch (e) {
    throw e;
  }
};

export const logOut = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.status(200).json({
      message: "User logged out successfully!",
    });
  } catch (e) {
    throw e;
  }
};
