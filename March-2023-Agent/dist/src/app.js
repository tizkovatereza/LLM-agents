// pages/api/submit.ts
export default function handler(req, res) {
    if (req.method === 'POST') {
        const userInput = req.body.userInput;
        console.log(`Received input: ${userInput}`);
        res.status(200).json({ message: `Thank you for your input: ${userInput}` });
    }
    else {
        // Handle any other HTTP method
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
