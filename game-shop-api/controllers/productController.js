import { validationResult } from "express-validator";

import { ObjectId } from "mongodb";
import ValidationError from "../errors/validationError.js";

export default class ProductController {
  constructor({ productService }) {
    this.productService = productService;
  }

  createProduct = async (req, res, next) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const error = new ValidationError(errors.errors);
        throw error;
      }

      const { name, description, price, quantity, categories } = req.body;

      const categoryObjectIds = categories.map((id) => new ObjectId(id));

      const product = await this.productService.createProduct({
        name,
        description,
        price,
        quantity,
        categoryObjectIds,
      });

      res.status(201).json({
        message: "Product created successfully!",
        product: product,
      });
    } catch (err) {
      next(err);
    }
  };

  updateProduct = async (req, res, next) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const error = new ValidationError(errors.errors);
        throw error;
      }

      const productId = req.params.productId;

      const { name, description, price, quantity, categories } = req.body;

      const updatedProduct = await this.productService.updateProduct({
        name,
        description,
        price,
        quantity,
        categories,
        productId,
      });

      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found!" });
      }

      res
        .status(200)
        .json({ message: "Product updated!", product: updatedProduct });
    } catch (err) {
      next(err);
    }
  };

  deleteProduct = async (req, res, next) => {
    const productId = req.params.productId;

    try {
      const product = await this.productService.deleteProduct(productId);

      if (!product) {
        return res.status(404).json({ message: "Product not found!" });
      }

      res.status(200).json({ message: "Product deleted!" });
    } catch (err) {
      next(err);
    }
  };

  getProducts = async (req, res, next) => {
    const currentPage = +req.query.pageNum || 1;
    const perPage = +req.query.perPage || 5;
    const category = req.query.category;

    try {
      const products = await this.productService.getProducts({
        currentPage,
        perPage,
        category,
      });

      if (!products) {
        return res.status(404).json({ message: "Products not found!" });
      }

      res.status(200).json({
        message: "Fetched products successfully!",
        products: products,
      });
    } catch (err) {
      next(err);
    }
  };

  getProduct = async (req, res, next) => {
    const productId = req.params.productId;

    try {
      const product = await this.productService.getProduct(productId);

      if (!product) {
        return res.status(404).json({
          message: "Product not found!",
        });
      }

      res.status(200).json({
        message: "Fetched product successfully!",
        product: product,
      });
    } catch (err) {
      next(err);
    }
  };
}
