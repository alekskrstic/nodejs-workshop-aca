const personJSObject = {
  name: "Mile",
  lastName: "Kitic",
  age: 71,
  profession: "singer",
};

const personJSON = JSON.stringify(personJSObject);

console.log(`Person JSON string: ${personJSON}`);
