import { NextApiRequest, NextApiResponse } from 'next';
import executeQuery from '../../../utils/query';
import bcrypt from 'bcrypt';
import { encrypt } from '../../../utils/cryptoUtils';

// Validation Function
const validateInputs = (body: any) => {
    // Add more validations here
    return /\S+@\S+\.\S+/.test(body.emailAddress) && body.ssn.length === 11 && body.mobileNumber.length >= 10;
};

// Password Hashing Function
const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS || "10"));
    return await bcrypt.hash(password, salt);
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log('Request method:', req.method);
    console.log('Request body:', req.body);

    if (req.method === 'POST') {
        const { firstName, lastName, dob, ssn, emailAddress, mobileNumber, physicalAddress, password } = req.body;

        if (!validateInputs(req.body)) {
            console.log('Invalid inputs:', req.body);
            return res.status(400).json({ error: 'Invalid inputs' });
        }

        try {
            const hashedPassword = await hashPassword(password);
            console.log('Hashed password:', hashedPassword);

            const encryptedSSN = await encrypt(ssn);
            console.log('Encrypted SSN:', encryptedSSN);

            const hashedSSN = await hashPassword(encryptedSSN);
            console.log('Hashed SSN:', hashedSSN);

            const sql = 'INSERT INTO users (FirstName, LastName, BirthDate, _a_ssn_, EmailAddress, MobileNumber, PhysicalAddress, Password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
            const values = [firstName, lastName, dob, hashedSSN, emailAddress, mobileNumber, physicalAddress, hashedPassword];

            console.log('SQL query:', sql);
            console.log('SQL values:', values);

            await executeQuery(sql, values);
            console.log('User created');

            res.status(201).json({ success: true, message: 'User created' });
        } catch (error: any) {
            console.log('Error:', error.message);
            res.status(500).json({ error: error.message });
        }
    } else {
        console.log('Method not allowed');
        res.status(405).json({ error: 'Method not allowed' });
    }
}
