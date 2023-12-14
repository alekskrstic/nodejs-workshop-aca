//Example 1: callback
const doSomethingWithCallback = (callback) => {
  setTimeout(() => {
    callback("Something just happened with callback!!!");
  }, 3000);
};

doSomethingWithCallback((result) => {
  console.log(result);
});

//Example 2: promise
const doSomethingPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Something just happened with promise!!!");
    //reject("Error occurred");
  }, 4000);
});

doSomethingPromise
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
