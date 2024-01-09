export default class CategoryService {
  constructor({ categoryRepository }) {
    this.categoryRepository = categoryRepository;
  }

  createCategory = async (categoryData) => {
    try {
      return await this.categoryRepository.createCategory(categoryData);
    } catch (err) {
      throw err;
    }
  };

  updateCategory = async (categoryData) => {
    try {
      return await this.categoryRepository.updateCategory(categoryData);
    } catch (err) {
      throw err;
    }
  };

  deleteCategory = async (categoryId) => {
    try {
      return await this.categoryRepository.deleteCategory(categoryId);
    } catch (err) {
      throw err;
    }
  };

  getCategory = async (categoryId) => {
    try {
      return await this.categoryRepository.getCategory(categoryId);
    } catch (err) {
      throw err;
    }
  };

  getCategories = async () => {
    try {
      return await this.categoryRepository.getCategories();
    } catch (err) {
      throw err;
    }
  };
}
