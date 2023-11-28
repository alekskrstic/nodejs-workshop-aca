import { validationResult } from "express-validator";

import { Category } from "../models/category.js";
import ValidationError from "../errors/validationError.js";

export const createCategory = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = new ValidationError(errors.errors);
      throw error;
    }

    const name = req.body.name;
    const description = req.body.description;

    const category = new Category(name, description);

    const result = await category.save();

    res.status(201).json({
      message: "Category created successfully!",
      category: result,
    });
  } catch (err) {
    next(err);
  }
};

export const updateCategory = async (req, res, next) => {
  const categoryId = req.params.categoryId;

  const name = req.body.name;
  const description = req.body.description;

  try {
    const category = await Category.fetchById(categoryId);

    if (!category) {
      return res.status(404).json({ message: "Category not found!" });
    }

    const updatedCategory = new Category(name, description, categoryId);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = new ValidationError(errors.errors);
      throw error;
    }

    const result = await updatedCategory.save();

    res.status(200).json({ message: "Category updated!", category: result });
  } catch (err) {
    next(err);
  }
};

export const deleteCategory = async (req, res, next) => {
  const categoryId = req.params.categoryId;

  try {
    const category = await Category.fetchById(categoryId);

    if (!category) {
      return res.status(404).json({ message: "Category not found!" });
    }

    await Category.deleteById(categoryId);

    res.status(200).json({ message: "Category deleted!" });
  } catch (err) {
    next(err);
  }
};

export const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.fetchAll();
    res.status(200).json({
      message: "Fetched categories successfully!",
      categories: categories,
    });
  } catch (err) {
    next(err);
  }
};

export const getCategory = async (req, res, next) => {
  const categoryId = req.params.categoryId;

  try {
    const category = await Category.fetchById(categoryId);

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
