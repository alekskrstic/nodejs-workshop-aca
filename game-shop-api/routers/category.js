import { Router } from "express";
import { body } from "express-validator";
import { auth } from "../middleware/auth.js";
import { container } from "../dependencyInjectionConfig.js";

const getCategoryRouter = () => {
  const categoryController = container.resolve("categoryController");
  const categoryRouter = Router();

  categoryRouter.post(
    "/",
    [
      body("name")
        .notEmpty()
        .trim()
        .isLength({ min: 3 })
        .withMessage("Name must be at least 3 chars long."),
      body("description")
        .notEmpty()
        .trim()
        .isLength({ max: 30 })
        .withMessage("Description must be less then 30 chars long."),
    ],
    auth,
    categoryController.createCategory
  );
  categoryRouter.get("/", categoryController.getCategories);
  categoryRouter.get("/:categoryId", categoryController.getCategory);
  categoryRouter.put(
    "/:categoryId",
    [
      body("name")
        .notEmpty()
        .trim()
        .isLength({ min: 3 })
        .withMessage("Name must be at least 3 chars long."),
      body("description")
        .notEmpty()
        .trim()
        .isLength({ max: 30 })
        .withMessage("Description must be less then 30 chars long."),
    ],
    auth,
    categoryController.updateCategory
  );
  categoryRouter.delete(
    "/:categoryId",
    auth,
    categoryController.deleteCategory
  );

  return categoryRouter;
};

export default getCategoryRouter;
