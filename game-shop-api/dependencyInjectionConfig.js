import awilix from "awilix";

import UserController from "./controllers/userController.js";
import UserService from "./services/userService.js";
import UserRepository from "./repositories/userRepository.js";

import CategoryController from "./controllers/categoryController.js";
import CategoryService from "./services/categoryService.js";
import CategoryRepository from "./repositories/categoryRepository.js";

import ProductController from "./controllers/productController.js";
import ProductService from "./services/productService.js";
import ProductRepository from "./repositories/productRepository.js";

import PurchaseController from "./controllers/purchaseController.js";
import PurchaseService from "./services/purchaseService.js";
import PurchaseRepository from "./repositories/purchaseRepository.js";

import AuthController from "./controllers/authController.js";

export const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY,
  strict: true,
});

export const setup = () => {
  container.register({
    userController: awilix.asClass(UserController),
    userService: awilix.asClass(UserService),
    userRepository: awilix.asClass(UserRepository),
    categoryController: awilix.asClass(CategoryController),
    categoryService: awilix.asClass(CategoryService),
    categoryRepository: awilix.asClass(CategoryRepository),
    productController: awilix.asClass(ProductController),
    productService: awilix.asClass(ProductService),
    productRepository: awilix.asClass(ProductRepository),
    purchaseController: awilix.asClass(PurchaseController),
    purchaseService: awilix.asClass(PurchaseService),
    purchaseRepository: awilix.asClass(PurchaseRepository),
    authController: awilix.asClass(AuthController),
  });
};
