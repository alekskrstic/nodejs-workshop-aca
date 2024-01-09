import { validationResult } from "express-validator";
import ValidationError from "../errors/validationError.js";

export default class CategoryController {
  constructor({ categoryService }) {
    this.categoryService = categoryService;
  }

  createCategory = async (req, res, next) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const error = new ValidationError(errors.errors);
        throw error;
      }

      const { description, name } = req.body;

      const category = await this.categoryService.createCategory({
        name,
        description,
      });

      res.status(201).json({
        message: "Category created successfully!",
        category: category,
      });
    } catch (err) {
      next(err);
    }
  };

  updateCategory = async (req, res, next) => {
    const categoryId = req.params.categoryId;

    const { description, name } = req.body;

    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const error = new ValidationError(errors.errors);
        throw error;
      }

      const category = await this.categoryService.updateCategory({
        categoryId,
        description,
        name,
      });

      if (!category) {
        return res.status(404).json({ message: "Category not found!" });
      }

      res
        .status(200)
        .json({ message: "Category updated!", category: category });
    } catch (err) {
      next(err);
    }
  };

  deleteCategory = async (req, res, next) => {
    const categoryId = req.params.categoryId;

    try {
      const category = await this.categoryService.deleteCategory(categoryId);

      if (!category) {
        return res.status(404).json({ message: "Category not found!" });
      }

      res.status(200).json({ message: "Category deleted!" });
    } catch (err) {
      next(err);
    }
  };

  getCategory = async (req, res, next) => {
    const categoryId = req.params.categoryId;

    try {
      const category = await this.categoryService.getCategory(categoryId);

      if (!category) {
        return res.status(404).json({
          message: "Category not found!",
        });
      }

      res.status(200).json({
        message: "Fetched category successfully!",
        category: category,
      });
    } catch (err) {
      next(err);
    }
  };

  getCategories = async (req, res, next) => {
    try {
      const categories = await this.categoryService.getCategories();

      if (!categories) {
        return res.status(404).json({
          message: "Categories not found!",
        });
      }

      res.status(200).json({
        message: "Fetched categories successfully!",
        categories: categories,
      });
    } catch (err) {
      next(err);
    }
  };
}
