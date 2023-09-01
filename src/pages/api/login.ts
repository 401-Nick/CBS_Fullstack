import type { NextApiRequest, NextApiResponse } from 'next';
import executeQuery from '../../../utils/query';
import bcrypt from 'bcrypt';

const loginHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('Entered loginHandler');

  if (req.method === 'POST') {
    console.log('Processing POST request');
    
    const { emailAddress, password } = req.body;
    console.log(`Received email: ${emailAddress} and password: ${password}`);

    try {
      // Retrieve hashed password from database
      const query = 'SELECT password FROM user_information WHERE emailAddress = ?';
      console.log(`Executing SQL query: ${query}`);
      
      const result = await executeQuery(query, [emailAddress]);

      console.log('SQL Query executed');
      console.log(`SQL Result: ${JSON.stringify(result)}`);

      if (result.length === 0) {
        console.log('No records found in database');
        res.status(401).json({ message: 'Invalid email or password' });
        return;
      }

      const hashedPassword = result[0].password;
      console.log(`Hashed password from DB: ${hashedPassword}`);

      // Use bcrypt to compare provided password to hashed password
      console.log('Comparing passwords using bcrypt');
      const match = await bcrypt.compare(password, hashedPassword);

      if (match) {
        console.log('Passwords match');
        res.status(200).json({ message: 'Login successful' });
      } else {
        console.log('Passwords do not match');
        res.status(401).json({ message: 'Invalid email or password' });
      }

    } catch (error: any) {
      console.error(`Caught exception: ${error.message}`);
      res.status(500).json({ message: `An error occurred: ${error.message}` });
    }
  } else {
    console.log('Request is not POST');
    res.status(405).json({ message: 'Method not allowed' });
  }
};

export default loginHandler;
