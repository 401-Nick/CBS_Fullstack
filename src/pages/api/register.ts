import { NextApiRequest, NextApiResponse } from 'next';
import executeQuery from '../../../utils/query';
import bcrypt from 'bcrypt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const {
            firstName,
            lastName,
            dob,
            ssn,
            emailAddress,
            mobileNumber,
            physicalAddress,
        } = req.body;

        // Input Validation
        if (!firstName || !lastName || !dob || !ssn || !emailAddress || !mobileNumber || !physicalAddress) 
            {return res.status(400).json({ error: 'All fields are required' });}

        if (!/\S+@\S+\.\S+/.test(emailAddress)) 
            {return res.status(400).json({ error: 'Valid email is required' });}

        if (ssn.length !== 11)                  
            {return res.status(400).json({ error: 'Valid SSN is required. 000-00-0000' });}

        if (mobileNumber.length < 10)           
            {return res.status(400).json({ error: 'Valid mobile number is required' });}

        // SQL Query to Insert Data
        
        const sql = 'INSERT INTO user_information (firstName, lastName, birthDate, ssn, emailAddress, mobileNumber, physicalAddress) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const values = [firstName, lastName, dob, ssn, emailAddress, mobileNumber, physicalAddress];

        try {
            await executeQuery(sql, values);
            res.status(201).json({ message: 'User registered successfully' });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}




