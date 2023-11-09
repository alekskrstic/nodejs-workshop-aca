import mongodb from "mongodb";

const mongoClient = mongodb.MongoClient;
let db;

export const mongoConnect = async (callback) => {
  try {
    const client = await mongoClient.connect(
      "mongodb+srv://alexandarkrstic91:c2yih4vI2W8Hhply@cluster0.ctakysa.mongodb.net/gamestore"
    );

    db = client.db();
    callback();
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getDb = () => {
  if (db) {
    return db;
  }
  throw Error("No database found.");
};
