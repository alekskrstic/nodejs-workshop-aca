import { MongoClient } from "mongodb";

let db;

export const mongoConnect = async (callback) => {
  try {
    const client = await MongoClient.connect(
      process.env.MONGO_DB_CONNECTION_STRING
    );

    db = client.db();
    callback();
  } catch (err) {
    throw err;
  }
};

export const getDb = () => {
  if (db) {
    return db;
  }
  throw Error("No database found.");
};
