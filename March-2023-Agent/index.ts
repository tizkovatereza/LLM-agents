const readline = require('readline');

// Define an interface that extends the Readline interface with the close method
interface ReadlineWithClose extends readline.Interface {
 close(): void;
}

// Create an instance of readline and cast it to the extended interface
const rl: ReadlineWithClose = readline.createInterface({
 input: process.stdin,
 output: process.stdout
}) as ReadlineWithClose;

// Ask the user for input
rl.question('Please enter some text: ', (answer) => {
 // Respond with "Thank you"
 console.log(`Thank you for your input: ${answer}`);

 // Close the readline interface
 rl.close();
});
