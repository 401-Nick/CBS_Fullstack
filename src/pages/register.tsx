
//The field is over simplified, it'd most likely need street, city, state, zip, etc. as separate fields.

import React, { useState } from 'react';
import styles from '../../styles/register.module.css';

// Type declaration for form data
type FormData = {
    firstName: string;
    lastName: string;
    dob: string;
    ssn: string;
    confirmPassword: string;
    password: string;
    emailAddress: string;
    mobileNumber: string;
    physicalAddress: string;
};

// Type declaration for error messages
type ErrorsType = {
    firstName?: string;
    lastName?: string;
    dob?: string;
    ssn?: string;
    password?: string;
    confirmPassword?: string;
    emailAddress?: string;
    mobileNumber?: string;
    physicalAddress?: string;
};

// Main React functional component for Register
export default function Register() {
    // State variable to keep track of form data
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        dob: '',
        ssn: '',
        password: '',
        confirmPassword: '',
        emailAddress: '',
        mobileNumber: '',
        physicalAddress: '',
    });

    // State variable to keep track of form errors
    const [errors, setErrors] = useState<ErrorsType>({});

    // Function to handle change events for form inputs
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Function to validate form data
    const validate = (formData: FormData): ErrorsType => {
        // Initialize errors object
        const errors: ErrorsType = {};

        if (!formData.firstName) {
            errors.firstName = "First name is required.";
        }

        if (!formData.lastName) {
            errors.lastName = "Last name is required.";
        }

        if (!formData.dob) {
            errors.dob = "Date of birth is required.";
        }

        // SSN validation: simplistic example; real-world cases might require regex
        if (!formData.ssn || formData.ssn.length !== 11) {
            errors.ssn = "Valid Social Security Number is required. 000-00-0000";
        }

        if (!formData.emailAddress || !/\S+@\S+\.\S+/.test(formData.emailAddress)) {
            errors.emailAddress = "Valid email is required.";
        }

        // Mobile number validation: again, real-world cases might require regex
        if (!formData.mobileNumber || formData.mobileNumber.length < 10) {
            errors.mobileNumber = "Valid mobile number is required.";
        }
        if (!formData.physicalAddress) {
            errors.physicalAddress = "Valid address is required.";
        }
        if (!formData.password) {
            errors.password = "Valid address is required.";
        }
        if (formData.confirmPassword !== formData.password) {
            errors.password = "Passwords do not match!";
        }

        return errors;
    };

    const registerUser = async (e: React.FormEvent) => {
        e.preventDefault();
        const formErrors = validate(formData); // pass formData as argument
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
        } else {
            const data = await response.json();
            console.log(data);
            console.error('Registration failed');
        }
    };


    return (
        <div className={styles.loginModule}>
        <form className={styles.userForm} onSubmit={registerUser}>
            <h1>Personal Information</h1>
            
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" name="firstName" placeholder="John" value={formData.firstName} onChange={handleChange} />
            <span className={styles.validation}>{errors.firstName}</span>
            
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" name="lastName" placeholder="Doe" value={formData.lastName} onChange={handleChange} />
            <span className={styles.validation}>{errors.lastName}</span>
            
            <label htmlFor="dob">Date of Birth</label>
            <input type="date" id="dob" name="dob" value={formData.dob} onChange={handleChange} />
            <span className={styles.validation}>{errors.dob}</span>
            
            <label htmlFor="ssn">Social Security Number</label>
            <input type="text" id="ssn" name="ssn" placeholder="000-00-0000" value={formData.ssn} onChange={handleChange} />
            <span className={styles.validation}>{errors.ssn}</span>

            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
            <span className={styles.validation}>{errors.password}</span>
            
            <label htmlFor="password">Confirm Password</label>
            <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Password" value={formData.confirmPassword} onChange={handleChange} />
            <span className={styles.validation}>{errors.confirmPassword}</span>

            <h1>Contact Information</h1>
            
            <label htmlFor="emailAddress">Email Address</label>
            <input type="text" id="emailAddress" name="emailAddress" placeholder="John.Doe@fullstack.banking.com" value={formData.emailAddress} onChange={handleChange} />
            <span className={styles.validation}>{errors.emailAddress}</span>
            
            <label htmlFor="mobileNumber">Mobile Number</label>
            <input type="tel" id="mobileNumber" name="mobileNumber" placeholder="000-000-0000" value={formData.mobileNumber} onChange={handleChange} />
            <span className={styles.validation}>{errors.mobileNumber}</span>
            
            <label htmlFor="physicalAddress">Residential Address</label>
            <input type="text" id="physicalAddress" name="physicalAddress" placeholder="123 Anystreet, Anytown, AN 12345-6789" value={formData.physicalAddress} onChange={handleChange} />
            <span className={styles.validation}>{errors.physicalAddress}</span>
            
            <button type="submit" className={styles.loginFormButtons} id="userLoginButton">Register</button>
            </form>
        </div>
    );
}