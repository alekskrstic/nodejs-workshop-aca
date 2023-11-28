import {
  createPurchase,
  getPurchase,
  getPurchases,
} from "../controllers/purchase.js";
import { auth } from "../middleware/auth.js";

import { Router } from "express";

const purchaseRouter = Router();

purchaseRouter.post("/", auth, createPurchase);
purchaseRouter.get("/", auth, getPurchases);
purchaseRouter.get("/:purchaseId", auth, getPurchase);

export default purchaseRouter;
