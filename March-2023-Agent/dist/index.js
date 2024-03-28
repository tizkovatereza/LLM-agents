"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rl = require("readline");
var readline = rl.createInterface({
    input: process.stdin,
    output: process.stdout
});
readline.question('Please enter some text: ', function (answer) {
    console.log("Thank you for your input: ".concat(answer));
    console.log('Hello friend'); // Respond with "Hello friend"
    readline.close();
});
