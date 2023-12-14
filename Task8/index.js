import request from "request";
import http from "http";
import fs from "fs";

//Example 1: using http

const options = {
  hostname: "jsonplaceholder.typicode.com",
  path: "/posts",
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};

const getPosts = () => {
  let data = "";

  const request = http.request(options, (response) => {
    response.setEncoding("utf8");

    // As data starts streaming in, add each chunk to "data"
    response.on("data", (chunk) => {
      data += chunk;
    });

    // The whole response has been received. Print out the result.
    response.on("end", () => {
      const jsonData = JSON.parse(data);
      console.log("Example 1: using http", jsonData);
    });
  });

  // Log errors if any occur
  request.on("error", (error) => {
    console.error(error);
  });

  // End the request
  request.end();
};

getPosts();

//Example 2: using request

const url = "https://jsonplaceholder.typicode.com/posts";

request({ url: url }, (error, response) => {
  const data = JSON.parse(response.body);
  fs.writeFileSync("Product.json", response.body, "utf8");
  console.log("Example 2: using request", data);
});
