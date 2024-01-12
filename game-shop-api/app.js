import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";

import { mongoConnect } from "./util/database.js";
import getCategoryRouter from "./routers/category.js";
import getProductRouter from "./routers/product.js";
import getUserRouter from "./routers/user.js";
import getPurchaseRouter from "./routers/purchase.js";
import getAuthRouter from "./routers/auth.js";
import { setup } from "./dependencyInjectionConfig.js";

setup();
dotenv.config({ path: "./config.env" });

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/category", getCategoryRouter());
app.use("/product", getProductRouter());
app.use("/user", getUserRouter());
app.use("/purchase", getPurchaseRouter());
app.use("/auth", getAuthRouter());

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const type = error.type || "";

  res.status(status).json({ code: status, type: type, message: message });
});

await mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING);

mongoConnect(() => {
  app.listen(process.env.PORT || 3000);
});
