import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";

import { mongoConnect } from "./util/database.js";
import categoryRouter from "./routers/category.js";
import productRouter from "./routers/product.js";
import userRouter from "./routers/user.js";
import purchaseRouter from "./routers/purchase.js";
import authRouter from "./routers/auth.js";

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

app.use("/category", categoryRouter);
app.use("/product", productRouter);
app.use("/user", userRouter);
app.use("/purchase", purchaseRouter);
app.use("/auth", authRouter);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});

await mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING);

mongoConnect(() => {
  app.listen(process.env.PORT || 3000);
});
