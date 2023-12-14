import fs from "fs";

import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const data = fs.readFileSync("Product.json");

console.log(JSON.parse(data));

yargs(hideBin(process.argv))
  .command({
    command: "remove",
    builder: {
      productId: {
        demandOption: true,
        type: "string",
      },
    },
    handler: function (argv) {
      fs.readFile("Product.json", function (err, data) {
        if (err) {
          console.log("Error occurred: ", err);
        }

        var json = JSON.parse(data);

        var idToRemove = +argv.productId;
        json = json.filter((child) => child.id !== idToRemove);

        fs.writeFileSync("Product.json", JSON.stringify(json), "utf8");

        const dataAfterRemove = fs.readFileSync("Product.json");
        console.log(JSON.parse(dataAfterRemove));
      });
    },
  })
  .parse();
