"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var app = (0, express_1.default)();
var port = 3000;
app.use(express_1.default.json());
app.post('/api/submit', function (req, res) {
    var userInput = req.body.userInput;
    console.log("Received input: ".concat(userInput));
    res.json({ message: "Thank you for your input: ".concat(userInput) });
});
app.use(express_1.default.static('public'));
app.listen(port, function () {
    console.log("Server running at http://localhost:".concat(port));
});
