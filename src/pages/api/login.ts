import type { NextApiRequest, NextApiResponse } from 'next';
import executeQuery from '../../../utils/query';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

// Database Query
const getHashedPasswordFromDB = async (emailAddress: string) => {
  const query = 'SELECT Password FROM users WHERE EmailAddress = ?';
  return await executeQuery(query, [emailAddress]);
};

// JWT Token Generation
const generateToken = (userId: string, secretKey: string) => {
  try {
    return jwt.sign({ userId }, secretKey, { expiresIn: '1h' });
  } catch (error) {
    throw new Error("Error generating token");
  }
};

const loginHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('Request method:', req.method);
  if (req.method === 'POST') {
    const { emailAddress, password } = req.body;

    if (!emailAddress || !password || typeof emailAddress !== 'string' || typeof password !== 'string') {
      console.log('Invalid email address or password format');
      return res.status(400).json({ message: 'Invalid email address or password format' });
    }

    try {
      const result = await getHashedPasswordFromDB(emailAddress);

      if (result.length === 0 || !result[0].Password) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const hashedPassword = result[0].Password.toString('utf-8');

      if (typeof hashedPassword !== 'string' || typeof password !== 'string') {
        return res.status(500).json({ message: 'Internal Server Error' });
      }
      const match = await bcrypt.compare(password, hashedPassword);
      const secretKey = process.env.JWT_SECRET_KEY || "";

      if (match && secretKey) {
        const token = generateToken(emailAddress, secretKey);
        return res.status(200).json({ message: 'Login successful', data: token });
      } else {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
    } catch (error: any) {
      if (error.message === "Error generating token") {
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: error.message });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
};

export default loginHandler;
