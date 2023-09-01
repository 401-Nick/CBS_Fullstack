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
            password,
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

        // Password Hashing
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        // SQL Query to Insert Data
        //Not unique values: firstName, lastName, birthDate, physicalAddress, password, mobileNumber
        //Unique values: emailAddress, ssn
        
        //Im wary of mobileNumber not being unique but I'm watching my use of it. If it proves to be problem I'll change it to unique.
        //Depends how 2FA is handled. 

        const sql = 'INSERT INTO user_information (firstName, lastName, birthDate, ssn, emailAddress, mobileNumber, physicalAddress, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        const values = [firstName, lastName, dob, ssn, emailAddress, mobileNumber, physicalAddress, hashedPassword];
        
        try {
            await executeQuery(sql, values);
            res.status(201).json({ success: true, message: ' ' });
        } catch (error: any) {
            //  Removed 409 to prevent against user numeration. Could be mitigated by IP banning/limiting however with auto IP rotation--
            //--a user could fuzz all the inputs looking for non 409 errors and then guess important unique fields like ssn. For that reason, the error code needs to be generic.
            /////////////////////////////////If you want Duplicate Entry errors to be verbose, uncomment the below code and comment out the line below it./////////////////////////////////////
            // if (error.code === 'ER_DUP_ENTRY') {res.status(409).json({ error: 'Registration failed due to duplicate information' });} else { res.status(500).json({ error: error.message });
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}