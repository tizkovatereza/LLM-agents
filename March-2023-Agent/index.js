"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rl = require("readline");
// Create an instance of readline and cast it to the extended interface
var readline = rl.createInterface({
    input: process.stdin,
    output: process.stdout
});
// Ask the user for input
readline.question('Please enter some text: ', function (answer) {
    // Respond with "Thank you"
    console.log("Thank you for your input: ".concat(answer));
    // Close the readline interface
    readline.close();
});
