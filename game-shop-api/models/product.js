import { getDb } from "../util/database.js";
import mongodb from "mongodb";

export class Product {
  constructor(name, description, price, quantity, categories, id) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.quantity = quantity;
    this.categories = categories;
    this._id = id ? new mongodb.ObjectId(id) : null;
  }

  async save() {
    try {
      const db = getDb();
      let dbOp;
      if (this._id) {
        dbOp = await db.collection("products").updateOne(
          { _id: this._id },
          {
            $set: this,
          }
        );
      } else {
        dbOp = await db.collection("products").insertOne(this);
      }

      return dbOp;
    } catch (err) {
      throw err;
    }
  }

  static async fetchByIds(productIds) {
    try {
      const db = getDb();
      const objectIds = productIds.map((id) => new mongodb.ObjectId(id));

      const match = { _id: { $in: objectIds } };

      const products = await db
        .collection("products")
        .aggregate([
          {
            $match: match,
          },
          {
            $lookup: {
              from: "categories",
              localField: "categories",
              foreignField: "_id",
              as: "categories",
            },
          },
        ])
        .toArray();

      return products;
    } catch (err) {
      throw err;
    }
  }

  static async fetchAll(currentPage, perPage, category) {
    try {
      const db = getDb();

      let match = {};
      if (category) {
        match = { categories: new mongodb.ObjectId(category) };
      }

      const products = await db
        .collection("products")
        .aggregate([
          {
            $match: match,
          },
          {
            $lookup: {
              from: "categories",
              localField: "categories",
              foreignField: "_id",
              as: "categories",
            },
          },
        ])
        .skip((currentPage - 1) * perPage)
        .limit(perPage)
        .toArray();

      return products;
    } catch (err) {
      throw err;
    }
  }

  static async fetchById(productId) {
    try {
      const db = getDb();

      var match = {
        _id: new mongodb.ObjectId(productId),
      };

      const product = await db
        .collection("products")
        .aggregate([
          {
            $match: match,
          },
          {
            $lookup: {
              from: "categories",
              localField: "categories",
              foreignField: "_id",
              as: "categories",
            },
          },
        ])
        .next();

      return product;
    } catch (err) {
      throw err;
    }
  }

  static async deleteById(productId) {
    try {
      const db = getDb();
      return await db
        .collection("products")
        .deleteOne({ _id: new mongodb.ObjectId(productId) });
    } catch (err) {
      throw err;
    }
  }
}
