// Import the readline module, which provides an interface for reading data from a Readable stream (like process.stdin) one line at a time.
import * as rl from 'readline';

// Define an interface named ReadlineWithClose that extends the Interface provided by the readline module.
// This new interface includes a close method, which is not part of the original Interface.
interface ReadlineWithClose extends rl.Interface {
    // Declare a method named close that takes no arguments and returns nothing (void).
    close(): void;
}

// Create an instance of readline, which is a readline Interface configured to read from process.stdin and write to process.stdout.
// The as ReadlineWithClose part is a type assertion, telling TypeScript that this instance will have the additional close method.
const readline: ReadlineWithClose = rl.createInterface({
    input: process.stdin, // Use the standard input stream (stdin) for reading user input.
    output: process.stdout // Use the standard output stream (stdout) for displaying messages to the user.
}) as ReadlineWithClose;

// Use the question method of the readline instance to display a prompt to the user and wait for their input.
// The question method takes two arguments: the prompt string and a callback function.
// The callback function is called with the user's input as its argument when the user presses Enter.
readline.question('Please enter some text: ', (answer) => {
    // Inside the callback function, log a message to the console that includes the user's input.
    console.log(`Thank you for your input: ${answer}`);

    // Call the close method on the readline instance to stop it from listening for more input.
    readline.close();
});
