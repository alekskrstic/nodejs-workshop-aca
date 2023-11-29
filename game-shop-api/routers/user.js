import { Router } from "express";
import { auth } from "../middleware/auth.js";

import {
  createUser,
  updateUser,
  getUser,
  getUsers,
  deleteUser,
} from "../controllers/user.js";

const userRouter = Router();

userRouter.post("/", createUser);
userRouter.get("/", auth, getUsers);
userRouter.get("/:userId", auth, getUser);
userRouter.put("/:userId", auth, updateUser);
userRouter.delete("/:userId", auth, deleteUser);

export default userRouter;
