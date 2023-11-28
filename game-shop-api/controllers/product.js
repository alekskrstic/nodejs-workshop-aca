import { validationResult } from "express-validator";

import { Product } from "../models/product.js";
import { ObjectId } from "mongodb";
import ValidationError from "../errors/validationError.js";

export const createProduct = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = new ValidationError(errors.errors);
      throw error;
    }

    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const quantity = req.body.quantity;
    const categories = req.body.categories;

    const categoryObjectIds = categories.map((id) => new ObjectId(id));

    const product = new Product(
      name,
      description,
      price,
      quantity,
      categoryObjectIds
    );

    const result = await product.save();

    res.status(201).json({
      message: "Product created successfully!",
      product: result,
    });
  } catch (err) {
    next(err);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = new ValidationError(errors.errors);
      throw error;
    }

    const productId = req.params.productId;

    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const quantity = req.body.quantity;
    const categories = req.body.categories;

    const product = await Product.fetchById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }

    const updatedProduct = new Product(
      name,
      description,
      price,
      quantity,
      categories,
      productId
    );

    const result = await updatedProduct.save();

    res.status(200).json({ message: "Product updated!", product: result });
  } catch (err) {
    next(err);
  }
};

export const deleteProduct = async (req, res, next) => {
  const productId = req.params.productId;

  try {
    const product = await Product.fetchById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }

    await Product.deleteById(productId);

    res.status(200).json({ message: "Product deleted!" });
  } catch (err) {
    next(err);
  }
};

export const getProducts = async (req, res, next) => {
  const currentPage = +req.query.pageNum || 1;
  const perPage = +req.query.perPage || 5;
  const category = req.query.category;

  try {
    const products = await Product.fetchAll(currentPage, perPage, category);

    res.status(200).json({
      message: "Fetched products successfully!",
      products: products,
    });
  } catch (err) {
    next(err);
  }
};

export const getProduct = async (req, res, next) => {
  const productId = req.params.productId;

  try {
    const product = await Product.fetchById(productId);

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
