import { getDb } from "../util/database.js";

class Product {
  constructor(name, description, price, quantity, categories) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.quantity = quantity;
    this.categories = categories;
  }

  async save() {
    try {
      const db = getDb();
      await db.collection("products").insertOne(this);
    } catch (err) {
      console.log(err);
    }
  }
}
