import User from "../models/user.js";

export const createUser = async (req, res, next) => {
  const userName = req.body.userName;
  const email = req.body.email;
  const password = req.body.password;
  const status = req.body.status;
  const roles = req.body.roles;

  const user = new User({
    userName: userName,
    email: email,
    password: password,
    status: status,
    roles: roles,
  });

  try {
    const validationError = user.validateSync();

    if (validationError) {
      const error = new Error(validationError.message);
      error.statusCode = 422;
      throw error;
    }

    const result = await user.save();
    const token = await user.generateAuthToken();

    res.status(201).json({
      message: "User created successfully!",
      user: result,
      token: token,
    });
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  const userId = req.params.userId;

  const userName = req.body.userName;
  const email = req.body.email;
  const password = req.body.password;
  const status = req.body.status;
  const roles = req.body.roles;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    user.userName = userName;
    user.email = email;
    user.password = password;
    user.status = status;
    user.roles = roles;

    const validationError = user.validateSync();

    if (validationError) {
      const error = new Error(validationError.message);
      error.statusCode = 422;
      throw error;
    }

    const result = await user.save();

    res.status(200).json({
      message: "User updated successfully!",
      user: result,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const result = await User.findByIdAndDelete(userId);

    res.status(200).json({
      message: "User deleted successfully!",
      user: result,
    });
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.status(200).json({
      message: "Fetched user successfully!",
      user: user,
    });
  } catch (err) {
    next(err);
  }
};

export const getUsers = async (req, res, next) => {
  const currentPage = +req.query.pageNum || 1;
  const perPage = +req.query.perPage || 5;
  const status = req.query.status;

  let filter = {};
  if (status) {
    filter = { status: status };
  }

  try {
    const users = await User.find(filter)
      .skip((currentPage - 1) * perPage)
      .limit(perPage);

    if (!users) {
      return res.status(404).json({ message: "Users not found!" });
    }

    res.status(200).json({
      message: "Fetched users successfully!",
      users: users,
    });
  } catch (err) {
    next(err);
  }
};
