import express from "express";
import { body } from "express-validator";

import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getProducts,
} from "../controllers/product.js";
import { auth } from "../middleware/auth.js";

const productRouter = express.Router();

productRouter.post(
  "/",
  [
    body("name")
      .trim()
      .isLength({ min: 5 })
      .withMessage("Name must be at least 5 chars long."),
    body("description")
      .trim()
      .isLength({ max: 30 })
      .withMessage("Description must be less then 30 chars long."),
  ],
  auth,
  createProduct
);
productRouter.get("/", auth, getProducts);
productRouter.get("/:productId", auth, getProduct);
productRouter.put(
  "/:productId",
  [
    body("name")
      .trim()
      .isLength({ min: 5 })
      .withMessage("Name must be at least 5 chars long."),
    body("description")
      .trim()
      .isLength({ max: 30 })
      .withMessage("Description must be less then 30 chars long."),
  ],
  auth,
  updateProduct
);
productRouter.delete("/:productId", auth, deleteProduct);

export default productRouter;
