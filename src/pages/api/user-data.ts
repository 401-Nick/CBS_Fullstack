import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("handler: API Endpoint Called");

    // Attempt to retrieve the 'Authorization' header from incoming request.
    const authHeader = req.headers.authorization;
    console.log(`handler: Retrieved Authorization header: ${authHeader}`);

    // Attempt to extract JWT token from the Authorization header
    const token = authHeader && authHeader.split(' ')[1];
    console.log(`handler: Extracted token: ${token}`);

    // Check if the token exists
    if (!token) {
        console.log("handler: No token provided, returning 401 Unauthorized");
        return res.status(401).json({ message: 'No token provided.' });
    }

    try {
        console.log("handler: Attempting to verify token");

        const decoded = jwt.verify(token, (process.env.JWT_SECRET_KEY || 'YourSecretKeyHere'));

        console.log("handler: Token successfully verified");
        console.log(`handler: Decoded token data: ${JSON.stringify(decoded)}`);

        // Mock data, replace this with an actual database query to fetch the user data
        const userData = {
            name: 'John Doe',
            email: 'john.doe@example.com',
            // ... other fields
        };

        console.log(`handler: Retrieved user data: ${JSON.stringify(userData)}`);

        // Send a 200 OK response along with the user data
        res.status(200).json(userData);
    } catch (error) {
        console.error(`handler: Token verification failed: ${JSON.stringify(error)}`);
        console.log("handler: Returning 403 Forbidden due to token verification failure");

        // Send a 403 Forbidden response
        res.status(403).json({ message: 'Failed to authenticate token.' });
    }
}
