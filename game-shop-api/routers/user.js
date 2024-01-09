import { Router } from "express";

import { auth } from "../middleware/auth.js";
import { container } from "../dependencyInjectionConfig.js";

const getUserRouter = () => {
  const userController = container.resolve("userController");
  const userRouter = Router();

  userRouter.post("/", userController.createUser);
  userRouter.get("/", auth, userController.getUsers);
  userRouter.get("/:userId", auth, userController.getUser);
  userRouter.put("/:userId", auth, userController.updateUser);
  userRouter.delete("/:userId", auth, userController.deleteUser);

  return userRouter;
};

export default getUserRouter;
