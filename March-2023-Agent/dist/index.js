"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the readline module, which provides an interface for reading data from a Readable stream (like process.stdin) one line at a time.
const rl = __importStar(require("readline"));
// Create an instance of readline, which is a readline Interface configured to read from process.stdin and write to process.stdout.
// The as ReadlineWithClose part is a type assertion, telling TypeScript that this instance will have the additional close method.
const readline = rl.createInterface({
    input: process.stdin, // Use the standard input stream (stdin) for reading user input.
    output: process.stdout // Use the standard output stream (stdout) for displaying messages to the user.
});
// Use the question method of the readline instance to display a prompt to the user and wait for their input.
// The question method takes two arguments: the prompt string and a callback function.
// The callback function is called with the user's input as its argument when the user presses Enter.
readline.question('Please enter some text: ', (answer) => {
    // Inside the callback function, log a message to the console that includes the user's input.
    console.log(`Thank you for your input: ${answer}`);
    // Call the close method on the readline instance to stop it from listening for more input.
    readline.close();
});
