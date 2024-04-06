// src/api/submit.ts
export default function handler(req, res) {
    if (req.method === 'POST') {
        // Assuming the request body contains a 'userInput' field
        const userInput = req.body.userInput;
        console.log(`Received input: ${userInput}`);
        // Respond with "Hello friend"
        res.status(200).json({ message: 'Hello friend' });
    }
    else {
        // Handle any other HTTP method
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
