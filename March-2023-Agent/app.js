"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express_2 = require("express");
var app = (0, express_1.default)();
var port = 3000;
// Middleware to parse JSON bodies
app.use((0, express_2.json)());
// Endpoint to handle form submissions
app.post('/api/submit', function (req, res) {
    var userInput = req.body.userInput;
    console.log("Received input: ".concat(userInput));
    res.json({ message: "Thank you for your input: ".concat(userInput) });
});
// Serve static files (HTML, CSS, JS)
app.use(express_1.default.static('public'));
app.listen(port, function () {
    console.log("Server running at http://localhost:".concat(port));
});
