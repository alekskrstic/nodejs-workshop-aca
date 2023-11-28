import { getDb } from "../util/database.js";

export class Category {
  constructor(name, description, id) {
    this.name = name;
    this.description = description;
    this.categoryId = +id;
  }

  async save() {
    try {
      const db = getDb();
      let dbOp;
      if (this.categoryId) {
        dbOp = await db.collection("categories").updateOne(
          { categoryId: this.categoryId },
          {
            $set: this,
          }
        );
      } else {
        const categories = await db.collection("categories").find().toArray();

        const categoryIds = categories.map((c) => c.categoryId);

        this.categoryId =
          categoryIds.length > 0 ? Math.max(...categoryIds) + 1 : 1;

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
        .find({ categoryId: +categoryId })
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
        .deleteOne({ categoryId: +categoryId });
    } catch (err) {
      throw err;
    }
  }
}
