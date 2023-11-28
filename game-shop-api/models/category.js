import { getDb } from "../util/database.js";
import mongodb from "mongodb";

export class Category {
  constructor(name, description, id) {
    this.name = name;
    this.description = description;
    this._id = id ? new mongodb.ObjectId(id) : null;
  }

  async save() {
    try {
      const db = getDb();
      let dbOp;
      if (this._id) {
        dbOp = await db.collection("categories").updateOne(
          { _id: this._id },
          {
            $set: this,
          }
        );
      } else {
        dbOp = await db.collection("categories").insertOne(this);
      }

      return dbOp;
    } catch (err) {
      throw err;
    }
  }

  static async fetchAll() {
    try {
      const db = getDb();
      return await db.collection("categories").find().toArray();
    } catch (err) {
      throw err;
    }
  }

  static async fetchById(categoryId) {
    try {
      const db = getDb();
      return await db
        .collection("categories")
        .find({ _id: new mongodb.ObjectId(categoryId) })
        .next();
    } catch (err) {
      throw err;
    }
  }

  static async deleteById(categoryId) {
    try {
      const db = getDb();
      return await db
        .collection("categories")
        .deleteOne({ _id: new mongodb.ObjectId(categoryId) });
    } catch (err) {
      throw err;
    }
  }
}
