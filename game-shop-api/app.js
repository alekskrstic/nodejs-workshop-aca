import http from "http";
import express from "express";
import bodyParser from "body-parser";

import { mongoConnect } from "./util/database.js";

const app = express();

app.use(bodyParser.json());

const server = http.createServer(app);

mongoConnect(() => {
  server.listen(3000);
});
