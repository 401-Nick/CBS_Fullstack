import FormStyles from "../styles/FormStyles.module.css"
import React, { useState } from 'react';
import InputField from './subcomponents/InputField';

type UserFormData = {
    emailAddress: string;
    password: string;
};

type ErrorsType = {
    emailAddress?: string;
    password?: string;
};

const formFields = [
    { label: "Email Address", type: "text",     id: "emailAddress",    name: "emailAddress",     placeholder: "example@example.com"},
    { label: "Password",      type: "password", id: "password", name: "password",  placeholder: "password" },
    { label: "Remember Me",   type: "checkbox", id: "rememberMe", name: "rememberMe", placeholder: ""}
];


const LoginModule = () => {
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [errors, setErrors] = useState<ErrorsType>({});
    const [formData, setFormData] = useState<UserFormData>({emailAddress: '', password: '',});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' });
    }

    const loginUser = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        setSubmitError(null);
        
        const { emailAddress, password } = formData;
        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ emailAddress, password }),
            });
            if (res.status === 200) {
                // redirect to dashboard
            } else {
                const { message } = await res.json();
                setSubmitError(message);
            }
        } catch (error: any) {
            console.error(`An unexpected error occurred: ${error}`);
            setSubmitError(error.message);
        }
    };


    return (
        <div>
            <form className={FormStyles.userForm} onSubmit={loginUser}>
                <h1>Login</h1>
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
                <span className={FormStyles.validation}>{submitError}</span>
                <button type="submit" className={FormStyles.loginFormButtons} id="userLoginButton">Login</button>
            </form>
        </div>
    )
}
export default LoginModule;