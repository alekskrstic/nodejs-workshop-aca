//Example 1
//Regular functions are better suited to be used as methods because arrow functions don't bind their own "this" value
const event = {
  name: "Basketball game",
  numberOfParticipants() {
    console.log(`Number of participants for ${this.name} is 20000.`);
  },
};

event.numberOfParticipants();

//Example 2
//Regular functions can be accessed before initialization
//If printName() where arrow function we would get an error ReferenceError: Cannot access 'printName' before initialization
printName();

console.log("Hello world");

function printName() {
  console.log("We are venom!");
}
