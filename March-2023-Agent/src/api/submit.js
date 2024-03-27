"use strict";
// src/api/submit.ts
Object.defineProperty(exports, "__esModule", { value: true });
function handler(req, res) {
    if (req.method === 'POST') {
        // Assuming the request body contains a 'userInput' field
        var userInput = req.body.userInput;
        console.log("Received input: ".concat(userInput));
        res.status(200).json({ message: "Thank you for your input: ".concat(userInput) });
    }
    else {
        // Handle any other HTTP method
        res.setHeader('Allow', ['POST']);
        res.status(405).end("Method ".concat(req.method, " Not Allowed"));
    }
}
exports.default = handler;
