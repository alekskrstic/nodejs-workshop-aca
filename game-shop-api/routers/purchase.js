import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { container } from "../dependencyInjectionConfig.js";

const getPurchaseRouter = () => {
  const purchaseController = container.resolve("purchaseController");

  const purchaseRouter = Router();

  purchaseRouter.post("/", auth, purchaseController.createPurchase);
  purchaseRouter.get("/", auth, purchaseController.getPurchases);
  purchaseRouter.get("/:purchaseId", auth, purchaseController.getPurchase);

  return purchaseRouter;
};
export default getPurchaseRouter;
