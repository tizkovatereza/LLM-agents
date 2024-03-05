const readline = require('readline');

// Create an interface for the readline module
interface Readline {
 question(query: string, callback: (answer: string) => void): void;
}

// Create an instance of readline
const rl: Readline = readline.createInterface({
 input: process.stdin,
 output: process.stdout
});

// Ask the user for input
rl.question('Please enter some text: ', (answer) => {
 // Respond with "Thank you"
 console.log(`Thank you for your input: ${answer}`);

 // Close the readline interface
 rl.close();
});
