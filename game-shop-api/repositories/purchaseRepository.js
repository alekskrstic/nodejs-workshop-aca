import Purchase from "../models/purchase.js";
import { Product } from "../models/product.js";

export default class PurchaseRepository {
  createPurchase = async (purchaseData) => {
    const { products, amount, userId } = purchaseData;

    const purchase = new Purchase({
      products: products,
      amount: amount,
      userId: userId,
    });

    try {
      const result = await purchase.save();

      return result;
    } catch (err) {
      throw err;
    }
  };

  getPurchase = async (purchaseId) => {
    let productIds = [];

    try {
      const purchase = await Purchase.findById(purchaseId);

      if (!purchase) {
        return undefined;
      }

      purchase.products.forEach((product) =>
        productIds.push(product.productId)
      );

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

      return mappedPurchase;
    } catch (err) {
      throw err;
    }
  };

  getPurchases = async (purchaseReq) => {
    const currentPage = +purchaseReq.pageNum || 1;
    const perPage = +purchaseReq.perPage || 5;
    const dateFrom = purchaseReq.dateFrom;
    const dateTo = purchaseReq.dateTo;

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

      return mappedPurchases;
    } catch (err) {
      throw err;
    }
  };
}
