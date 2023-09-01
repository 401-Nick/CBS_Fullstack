// import Link from "next/link";
import styles from "../styles/page.module.css"



// const LoginModule = () => {
//     return(
//         <div className={styles.loginModule}>
//             <form className={styles.userForm} id="userForm">
//                 <label htmlFor="userLoginIdField">User ID: </label>
//                 <span className={styles.validation}>This is an example message! </span>
//                 <input type="text" id="userLoginIdField" placeholder="User ID"></input>
//                 <a href="/forgotId">Forgot your UserID?</a>

//                 <label htmlFor="userLoginPasswordField">Password: </label>
//                 <span className={styles.validation}>This is one too!</span>
//                 <input type="password" id="userLoginPasswordField" placeholder="Password"></input>
                
//                 <a href="/resetPassword">Forgot your Password?</a>
//                 <div className={styles.rememberMeField}>
//                 <input type="checkbox" id="rememberMeCheckbox" />
//                 <div>Remember Me</div>
//                 </div>
                
//                 <button className={styles.loginFormButtons} id="userLoginButton">Login</button>
//                 <Link className={styles.registerButton} href="/register"><button className={styles.loginFormButtons} id="userRegisterButton">Register</button></Link>
//             </form>
//         </div>
//     )
// }
// export default LoginModule;




import React, { useState } from 'react';
import InputField from './InputField';

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
];


const LoginModule = () => {
    const [formData, setFormData] = useState<UserFormData>({
        emailAddress: '',
        password: '',
    });
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [errors, setErrors] = useState<ErrorsType>({});

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
            <form className={styles.userForm} onSubmit={loginUser}>
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
                <span className={styles.validation}>{submitError}</span>
                <button type="submit" className={styles.loginFormButtons} id="userLoginButton">Login</button>
            </form>
        </div>
    )
}
export default LoginModule;