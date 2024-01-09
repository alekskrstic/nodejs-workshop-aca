import User from "../models/user.js";

export default class UserRepository {
  createUser = async (userData) => {
    const user = new User(userData);

    try {
      const validationError = user.validateSync();

      if (validationError) {
        const error = new Error(validationError.message);
        error.statusCode = 422;
        throw error;
      }

      const result = await user.save();
      const token = await user.generateAuthToken();

      return {
        user: result,
        token: token,
      };
    } catch (err) {
      throw err;
    }
  };

  updateUser = async (userData) => {
    try {
      const user = await User.findById(userData.userId);

      if (!user) {
        return undefined;
      }

      user.userName = userData.userName;
      user.email = userData.email;
      user.password = userData.password;
      user.status = userData.status;
      user.roles = userData.roles;

      const validationError = user.validateSync();

      if (validationError) {
        const error = new Error(validationError.message);
        error.statusCode = 422;
        throw error;
      }

      const result = await user.save();

      return {
        user: result,
      };
    } catch (err) {
      throw err;
    }
  };

  deleteUser = async (userId) => {
    try {
      const user = await User.findById(userId);

      if (!user) {
        return undefined;
      }

      const result = await User.findByIdAndDelete(userId);

      return {
        user: result,
      };
    } catch (err) {
      throw err;
    }
  };

  getUser = async (userId) => {
    try {
      const user = await User.findById(userId);

      if (!user) {
        return undefined;
      }

      return {
        user: user,
      };
    } catch (err) {
      throw err;
    }
  };

  getUsers = async (userReq) => {
    const currentPage = +userReq.pageNum || 1;
    const perPage = +userReq.perPage || 5;
    const status = userReq.status;

    let filter = {};
    if (status) {
      filter = { status: status };
    }

    try {
      const users = await User.find(filter)
        .skip((currentPage - 1) * perPage)
        .limit(perPage);

      if (!users) {
        return undefined;
      }

      return {
        users: users,
      };
    } catch (err) {
      throw err;
    }
  };

  getByCredentials = async (userReq) => {
    try {
      const user = await User.findByCredentials(
        userReq.email,
        userReq.password
      );

      if (!user) {
        return undefined;
      }

      const token = await user.generateAuthToken();

      return {
        user: user,
        token: token,
      };
    } catch (err) {
      throw err;
    }
  };
}
