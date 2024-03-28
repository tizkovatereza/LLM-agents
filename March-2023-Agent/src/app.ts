import express from 'express';
import { Request, Response } from 'express';

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Endpoint to handle form submissions
app.post('/api/submit', (req: Request, res: Response) => {
    const userInput = req.body.userInput;
    console.log(`Received input: ${userInput}`);
    res.json({ message: `Thank you for your input: ${userInput}` });
});

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

// Export the Express application
export default app;
