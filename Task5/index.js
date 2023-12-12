import yargs from "yargs";
import { hideBin } from "yargs/helpers";

//Run:  node index.js hello --name "Some name"
yargs(hideBin(process.argv))
  .command({
    command: "hello",
    builder: {
      name: {
        demandOption: true,
        type: "string",
      },
    },
    handler: function (argv) {
      console.log(`Hello ${argv.name} have a nice day!!!`);
    },
  })
  .parse();
