import { Router } from "express";
import { body } from "express-validator";
import { container } from "../dependencyInjectionConfig.js";

import { auth } from "../middleware/auth.js";

const getProductRouter = () => {
  const productController = container.resolve("productController");

  const productRouter = Router();

  productRouter.post(
    "/",
    [
      body("name")
        .trim()
        .isLength({ min: 5 })
        .withMessage("Name must be at least 5 chars long."),
      body("description")
        .notEmpty()
        .trim()
        .isLength({ max: 30 })
        .withMessage("Description must be less then 30 chars long."),
    ],
    auth,
    productController.createProduct
  );
  productRouter.get("/", productController.getProducts);
  productRouter.get("/:productId", productController.getProduct);
  productRouter.put(
    "/:productId",
    [
      body("name")
        .trim()
        .isLength({ min: 5 })
        .withMessage("Name must be at least 5 chars long."),
      body("description")
        .notEmpty()
        .trim()
        .isLength({ max: 30 })
        .withMessage("Description must be less then 30 chars long."),
    ],
    auth,
    productController.updateProduct
  );
  productRouter.delete("/:productId", auth, productController.deleteProduct);

  return productRouter;
};

export default getProductRouter;
