"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_2 = require("express");
const app = (0, express_1.default)();
const port = 3000;
// Middleware to parse JSON bodies
app.use((0, express_2.json)());
// Endpoint to handle form submissions
app.post('/api/submit', (req, res) => {
    const userInput = req.body.userInput;
    console.log(`Received input: ${userInput}`);
    res.json({ message: `Thank you for your input: ${userInput}` });
});
// Serve static files (HTML, CSS, JS)
app.use(express_1.default.static('public'));
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
