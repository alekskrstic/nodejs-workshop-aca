import { Product } from "../models/product.js";
import { ObjectId } from "mongodb";

export default class ProductRepository {
  createProduct = async (productData) => {
    try {
      const categoryObjectIds = productData.categoryObjectIds.map(
        (id) => new ObjectId(id)
      );

      const product = new Product(
        productData.name,
        productData.description,
        productData.price,
        productData.quantity,
        categoryObjectIds
      );

      const result = await product.save();

      return result;
    } catch (err) {
      throw err;
    }
  };

  updateProduct = async (productData) => {
    try {
      const product = await Product.fetchById(productData.productId);

      if (!product) {
        return undefined;
      }

      const updatedProduct = new Product(
        productData.name,
        productData.description,
        productData.price,
        productData.quantity,
        productData.categories,
        productData.productId
      );

      const result = await updatedProduct.save();

      return result;
    } catch (err) {
      throw err;
    }
  };

  deleteProduct = async (productId) => {
    try {
      const product = await Product.fetchById(productId);

      if (!product) {
        return undefined;
      }

      await Product.deleteById(productId);

      return true;
    } catch (err) {
      throw err;
    }
  };

  getProduct = async (productId) => {
    try {
      const product = await Product.fetchById(productId);

      if (!product) {
        return undefined;
      }

      return product;
    } catch (err) {
      throw err;
    }
  };

  getProducts = async (productReq) => {
    const currentPage = +productReq.pageNum || 1;
    const perPage = +productReq.perPage || 5;
    const category = productReq.category;

    try {
      const products = await Product.fetchAll(currentPage, perPage, category);

      if (!products) {
        return undefined;
      }

      return products;
    } catch (err) {
      throw err;
    }
  };
}
