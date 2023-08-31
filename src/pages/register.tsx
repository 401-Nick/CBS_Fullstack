import React, { useState } from 'react';
import InputField from '../../components/InputField';

import { validate } from '../../utils/validate';
import { registerUserAPI } from '../../utils/apiService';

import styles from '../../styles/register.module.css';

type UserFormData = {
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

const formFields = [
    { label: "First Name", type: "text", id: "firstName", name: "firstName", placeholder: "John" },
    { label: "Last Name", type: "text", id: "lastName", name: "lastName", placeholder: "Doe" },
    { label: "Date of Birth", type: "date", id: "dob", name: "dob", placeholder: "MM-DD-YYYY" },
    { label: "Social Security Number", type: "text", id: "ssn", name: "ssn", placeholder: "000-00-0000" },
    { label: "Password", type: "password", id: "password", name: "password", placeholder: "Password" },
    { label: "Confirm Password", type: "password", id: "confirmPassword", name: "confirmPassword", placeholder: "Password" },
    { label: "Email Address", type: "text", id: "emailAddress", name: "emailAddress", placeholder: "" },
    { label: "Mobile Number", type: "text", id: "mobileNumber", name: "mobileNumber", placeholder: "000-000-0000" },
    { label: "Physical Address", type: "text", id: "physicalAddress", name: "physicalAddress", placeholder: "1234 Main St" },
]

export default function Register() {
    const [formData, setFormData] = useState<UserFormData>({
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

    const [errors, setErrors] = useState<ErrorsType>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const registerUser = async (e: React.FormEvent) => {
        e.preventDefault();
        const formErrors = validate(formData);

        //If the array of formErrors is not empty, populate it with the errors.
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        try {
            const apiResponse = await registerUserAPI(formData);  // Use the API function to register the user
            if (apiResponse) {
                console.log(apiResponse.message);
            }
        } catch (error) {
            console.error(`Registration failed: ${error}`);
        }
    };
    return (
        <div>
            <form className={styles.userForm} onSubmit={registerUser}>
                <h1>Personal and Account Information</h1>
                {formFields.map(field => (
                <InputField 
                    key={field.id}
                    label={field.label}
                    type={field.type}
                    id={field.id}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={formData[field.name as keyof UserFormData]}
                    onChange={handleChange}
                    error={errors[field.name as keyof ErrorsType]}
                />
                ))}
                <button type="submit" className={styles.loginFormButtons} id="userLoginButton" onClick={registerUser}>Register</button>
            </form>
        </div>
    );
}