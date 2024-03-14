import express, { json } from 'express';

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(json());

// Endpoint to handle form submissions
app.post('/api/submit', (req, res) => {
    const userInput = req.body.userInput;
    console.log(`Received input: ${userInput}`);
    res.json({ message: `Thank you for your input: ${userInput}` });
});

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
