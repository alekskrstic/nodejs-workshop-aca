import { Router } from "express";

import { auth } from "../middleware/auth.js";
import { container, setup } from "../dependencyInjectionConfig.js";

setup();
const userController = container.resolve("userController");
const userRouter = Router();

userRouter.post("/", userController.createUser);
userRouter.get("/", auth, userController.getUsers);
userRouter.get("/:userId", auth, userController.getUser);
userRouter.put("/:userId", auth, userController.updateUser);
userRouter.delete("/:userId", auth, userController.deleteUser);

export default userRouter;
