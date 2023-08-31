import React from 'react';
import styles from '../styles/inputField.module.css';

// TypeScript Interface for InputField component props
interface InputFieldProps {
    label: string;
    type: string;
    id: string;
    name: string;
    placeholder: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    error?: string | null;
}

// InputField Component
const InputField: React.FC<InputFieldProps> = ({
    label,
    type,
    id,
    name,
    placeholder,
    value,
    onChange,
    error}) => {
    
    return (
        <div>
            <label htmlFor={id}>{label}</label>
            <input
                type={type}
                id={id}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            {error && <div className={styles.validation}>{error}</div>}
        </div>
    );
};

export default InputField;
