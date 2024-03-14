var express = require('express');
var json = require('express').json;
var app = express();
var port = 3000;
// Middleware to parse JSON bodies
app.use(json());
// Endpoint to handle form submissions
app.post('/api/submit', function (req, res) {
    var userInput = req.body.userInput;
    console.log("Received input: ".concat(userInput));
    res.json({ message: "Thank you for your input: ".concat(userInput) });
});
// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));
app.listen(port, function () {
    console.log("Server running at http://localhost:".concat(port));
});
