import React from 'react';
import './FormInput.css';

interface FormInputProps {
  label: string;
  name: string;
  type: 'text' | 'email' | 'password' | 'phone' | 'number';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  icon?: React.ReactNode;
  required?: boolean;
  disabled?: boolean;
  autoComplete?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  type,
  value,
  onChange,
  placeholder,
  error,
  icon,
  required = false,
  disabled = false,
  autoComplete,
}) => {
  return (
    <div className="form-input-group">
      <label htmlFor={name} className="form-label">
        {label}
        {required && <span className="required-asterisk">*</span>}
      </label>
      <div className="input-wrapper">
        {icon && <span className="input-icon">{icon}</span>}
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          autoComplete={autoComplete}
          className={`form-input ${error ? 'input-error' : ''}`}
          aria-label={label}
          aria-describedby={error ? `${name}-error` : undefined}
        />
      </div>
      {error && (
        <span id={`${name}-error`} className="error-message">
          {error}
        </span>
      )}
    </div>
  );
};
