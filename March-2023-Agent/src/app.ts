import express, { Request, Response } from 'express';


const app = express();
const port = 3000;

app.use(express.json());

app.post('/api/submit', (req: Request, res: Response) => {
    const userInput = req.body.userInput;
    console.log(`Received input: ${userInput}`);
    res.json({ message: `Thank you for your input: ${userInput}` });
});

app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
