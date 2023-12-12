const fs = require("fs");
const os = require("os");
const _ = require("lodash");

const { product1, getProduct } = require("./product.js");

fs.writeFileSync("data.txt", "some text");

console.log(`Hello ${os.userInfo().username}`);

console.log("Product1", product1);
console.log("Product2", getProduct());
console.log("Sum three numbers", _.sum([3, 6, 9]));
