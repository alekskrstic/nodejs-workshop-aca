import { ObjectId } from "mongodb";
export default class UserController {
  constructor({ userService }) {
    this.userService = userService;
  }

  createUser = async (req, res, next) => {
    const { userName, email, password, status, roles } = req.body;

    try {
      const { user, token } = await this.userService.createUser({
        userName,
        email,
        password,
        status,
        roles,
      });

      res.status(201).json({
        message: "User created successfully!",
        user: user,
        token: token,
      });
    } catch (err) {
      next(err);
    }
  };

  updateUser = async (req, res, next) => {
    const userId = req.params.userId;
    const { userName, email, password, status, roles } = req.body;

    try {
      if (!ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid userId!" });
      }

      const { user } = await this.userService.updateUser({
        userId,
        userName,
        email,
        password,
        status,
        roles,
      });

      res.status(200).json({
        message: "User updated successfully!",
        user: user,
      });
    } catch (err) {
      next(err);
    }
  };

  deleteUser = async (req, res, next) => {
    const userId = req.params.userId;

    try {
      if (!ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid userId!" });
      }

      const { user } = await this.userService.deleteUser(userId);

      res.status(200).json({
        message: "User deleted successfully!",
        user: user,
      });
    } catch (err) {
      next(err);
    }
  };

  getUser = async (req, res, next) => {
    const userId = req.params.userId;

    try {
      if (!ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid userId!" });
      }

      const { user } = await this.userService.getUser(userId);

      res.status(200).json({
        message: "Fetched user successfully!",
        user: user,
      });
    } catch (err) {
      next(err);
    }
  };

  getUsers = async (req, res, next) => {
    const { pageNum, perPage, status } = req.query;

    try {
      const { users } = await this.userService.getUsers({
        pageNum,
        perPage,
        status,
      });

      res.status(200).json({
        message: "Fetched users successfully!",
        users: users,
      });
    } catch (err) {
      next(err);
    }
  };
}
