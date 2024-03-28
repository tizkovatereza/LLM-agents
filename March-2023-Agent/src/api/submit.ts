// src/api/submit.ts

import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
 if (req.method === 'POST') {
    // Assuming the request body contains a 'userInput' field
    const userInput = req.body.userInput;
    console.log(`Received input: ${userInput}`);

    res.status(200).json({ message: `Thank you for your input: ${userInput}` });
 } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
 }
}
