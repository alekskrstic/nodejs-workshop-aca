export default class ProductService {
  constructor({ productRepository }) {
    this.productRepository = productRepository;
  }

  createProduct = async (productData) => {
    try {
      return await this.productRepository.createProduct(productData);
    } catch (err) {
      throw err;
    }
  };

  updateProduct = async (productData) => {
    try {
      return await this.productRepository.updateProduct(productData);
    } catch (err) {
      throw err;
    }
  };

  deleteProduct = async (productId) => {
    try {
      return await this.productRepository.deleteProduct(productId);
    } catch (err) {
      throw err;
    }
  };

  getProduct = async (productId) => {
    try {
      return await this.productRepository.getProduct(productId);
    } catch (err) {
      throw err;
    }
  };

  getProducts = async (productReq) => {
    try {
      return await this.productRepository.getProducts(productReq);
    } catch (err) {
      throw err;
    }
  };
}
