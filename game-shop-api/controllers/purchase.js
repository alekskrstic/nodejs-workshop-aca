import Purchase from "../models/purchase.js";
import { Product } from "../models/product.js";

export const createPurchase = async (req, res, next) => {
  const products = req.body.products;
  const amount = req.body.amount;
  const userId = req.user._id;

  const purchase = new Purchase({
    products: products,
    amount: amount,
    userId: userId,
  });

  try {
    const validationError = purchase.validateSync();

    if (validationError) {
      const error = new Error(validationError.message);
      error.statusCode = 422;
      throw error;
    }

    const result = await purchase.save();

    res.status(201).json({
      message: "Purchase created successfully!",
      user: result,
    });
  } catch (err) {
    next(err);
  }
};

export const getPurchase = async (req, res, next) => {
  const purchaseId = req.params.purchaseId;

  let productIds = [];

  try {
    const purchase = await Purchase.findById(purchaseId);

    if (!purchase) {
      return res.status(404).json({ message: "Purchase not found!" });
    }

    purchase.products.forEach((product) => productIds.push(product.productId));

    const productsFromPurchase = await Product.fetchByIds(productIds);

    let mappedPurchase = {
      _id: purchase._id,
      products: [],
      amount: purchase.amount,
    };

    purchase.products.forEach((p) => {
      let product = productsFromPurchase.find(
        (pr) => pr._id.toString() === p.productId.toString()
      );

      mappedPurchase.products.push({
        product: product,
        quantity: p.quantity,
      });
    });

    res.status(200).json({
      message: "Fetched purchase successfully!",
      purchase: mappedPurchase,
    });
  } catch (err) {
    throw err;
  }
};

export const getPurchases = async (req, res, next) => {
  const currentPage = +req.query.pageNum || 1;
  const perPage = +req.query.perPage || 5;
  const dateFrom = req.query.dateFrom;
  const dateTo = req.query.dateTo;

  let productIds = [];

  try {
    let filter = {};
    if (dateFrom && dateTo) {
      filter = {
        createdAt: {
          $gte: new Date(dateFrom),
          $lt: new Date(dateTo),
        },
      };
    } else if (dateFrom) {
      filter = {
        createdAt: {
          $gte: new Date(dateFrom),
        },
      };
    } else if (dateTo) {
      filter = {
        createdAt: {
          $lt: new Date(dateTo),
        },
      };
    }

    const purchases = await Purchase.find(filter)
      .skip((currentPage - 1) * perPage)
      .limit(perPage);

    if (!purchases) {
      return res.status(404).json({ message: "Purchases not found!" });
    }

    purchases.forEach((purchase) => {
      purchase.products.forEach((product) =>
        productIds.push(product.productId)
      );
    });

    const productsFromPurchases = await Product.fetchByIds(productIds);

    let mappedPurchases = [];

    purchases.forEach((purchase) => {
      let mappedPurchase = {
        _id: purchase._id,
        products: [],
        amount: purchase.amount,
      };

      purchase.products.forEach((prod) => {
        let product = productsFromPurchases.find(
          (pr) => pr._id.toString() === prod.productId.toString()
        );
        mappedPurchase.products.push({
          product: product,
          quantity: prod.quantity,
        });
      });

      mappedPurchases.push(mappedPurchase);
    });

    res.status(200).json({
      message: "Fetched purchases successfully!",
      purchases: mappedPurchases,
    });
  } catch (err) {
    throw err;
  }
};
