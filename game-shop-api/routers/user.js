import { Router } from "express";

import {
  createUser,
  updateUser,
  getUser,
  getUsers,
  deleteUser,
} from "../controllers/user.js";

const userRouter = Router();

userRouter.post("/", createUser);
userRouter.get("/", getUsers);
userRouter.get("/:userId", getUser);
userRouter.put("/:userId", updateUser);
userRouter.delete("/:userId", deleteUser);

export default userRouter;
