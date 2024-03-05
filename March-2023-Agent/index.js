var readline = require('readline');
// Create an instance of readline and cast it to the extended interface
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
// Ask the user for input
rl.question('Please enter some text: ', function (answer) {
    // Respond with "Thank you"
    console.log("Thank you for your input: ".concat(answer));
    // Close the readline interface
    rl.close();
});
