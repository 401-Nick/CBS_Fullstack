import FormStyles from "../styles/FormStyles.module.css";
import React, { useState } from "react";
import InputField from "./subcomponents/InputField";
import Router from "next/router";

type UserFormData = { emailAddress: string; password: string; };
type ErrorsType = { emailAddress?: string; password?: string; };

const formFields = [
  { label: "Email Address", type: "text", id: "emailAddress", name: "emailAddress", placeholder: "example@example.com" },
  { label: "Password", type: "password", id: "password", name: "password", placeholder: "password" },
  { label: "Remember Me", type: "checkbox", id: "rememberMe", name: "rememberMe", placeholder: "" },
];

const LoginModule = () => {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [errors, setErrors] = useState<ErrorsType>({});
  const [formData, setFormData] = useState<UserFormData>({ emailAddress: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
    setErrors(prevErrors => ({ ...prevErrors, [name]: "" }));
  };

  const storeToken = (token: string) => {
    localStorage.setItem("token", token);
  };

  const loginUser = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setSubmitError(null);
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.status === 200) {
      const { message, data: token } = await res.json();
      storeToken(token);
      Router.push("/dashboard");
    } else {
      const { message } = await res.json();
      setSubmitError(message);
    }
  };

  return (
    <div>
      <form className={FormStyles.userForm} onSubmit={loginUser}>
        <h1>Login</h1>
        {formFields.map(field => (
          <InputField key={field.id} {...field}
            value={formData[field.name as keyof UserFormData]}
            onChange={handleChange}
            error={errors[field.name as keyof ErrorsType]}
          />
        ))}
        <span className={FormStyles.validation}>{submitError}</span>
        <button type="submit" className={FormStyles.loginFormButtons}>Login</button>
      </form>
    </div>
  );
};

export default LoginModule;
