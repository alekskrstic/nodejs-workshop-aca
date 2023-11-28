import { Router } from "express";

import { logIn, logOut } from "../controllers/auth.js";

const authRouter = Router();

authRouter.post("/login", logIn);
authRouter.post("/logout", logOut);

export default authRouter;
