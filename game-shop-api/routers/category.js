import { Router } from "express";
import { body } from "express-validator";
import {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getCategories,
} from "../controllers/category.js";
import { auth } from "../middleware/auth.js";

const categoryRouter = Router();

categoryRouter.post(
  "/",
  [
    body("name")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 chars long."),
    body("description")
      .trim()
      .isLength({ max: 30 })
      .withMessage("Description must be less then 30 chars long."),
  ],
  auth,
  createCategory
);
categoryRouter.get("/", auth, getCategories);
categoryRouter.get("/:categoryId", auth, getCategory);
categoryRouter.put(
  "/:categoryId",
  [
    body("name")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 chars long."),
    body("description")
      .trim()
      .isLength({ max: 30 })
      .withMessage("Description must be less then 30 chars long."),
  ],
  auth,
  updateCategory
);
categoryRouter.delete("/:categoryId", auth, deleteCategory);

export default categoryRouter;
