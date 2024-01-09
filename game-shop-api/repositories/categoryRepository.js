import { Category } from "../models/category.js";

export default class CategoryRepository {
  createCategory = async (categoryData) => {
    try {
      const category = new Category(
        categoryData.name,
        categoryData.description
      );

      const result = await category.save();

      return result;
    } catch (err) {
      throw err;
    }
  };

  updateCategory = async (categoryData) => {
    try {
      const category = await Category.fetchById(categoryData.categoryId);

      if (!category) {
        return undefined;
      }

      const updatedCategory = new Category(
        categoryData.name,
        categoryData.description,
        categoryData.categoryId
      );

      const result = await updatedCategory.save();

      return result;
    } catch (err) {
      throw err;
    }
  };

  deleteCategory = async (categoryId) => {
    try {
      const category = await Category.fetchById(categoryId);

      if (!category) {
        return undefined;
      }

      await Category.deleteById(categoryId);

      return true;
    } catch (err) {
      throw err;
    }
  };

  getCategory = async (categoryId) => {
    try {
      const category = await Category.fetchById(categoryId);

      if (!category) {
        return undefined;
      }

      return category;
    } catch (err) {
      throw err;
    }
  };

  getCategories = async () => {
    try {
      const categories = await Category.fetchAll();

      if (!categories) {
        return undefined;
      }

      return categories;
    } catch (err) {
      throw err;
    }
  };
}
