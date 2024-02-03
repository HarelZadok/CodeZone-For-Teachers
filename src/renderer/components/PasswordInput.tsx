import { MdOutlinePassword, MdAbc } from 'react-icons/md';
import React, { useState } from 'react';
import './PasswordInput.css';

type PasswordInputProps = {
  showPassword?: boolean;
  label?: string;
  value?: string;
  onChange?: (value: any) => void;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  id?: string;
  name?: string;
  orientation?: 'horizontal' | 'vertical';
};

function PasswordInput({
  showPassword,
  disabled,
  id,
  label,
  name,
  onChange,
  placeholder,
  required,
  value,
  orientation,
}: PasswordInputProps) {
  const [show, setShow] = useState(showPassword || false);

  const handleInputChange = (e: { target: { value: any } }) => {
    if (onChange) onChange(e);
  };

  return (
    <div
      className="password-input"
      style={{ flexDirection: orientation === 'vertical' ? 'column' : 'row' }}
    >
      {label && <label htmlFor={id}>{label}</label>}
      <div className="password-input__container">
        <input
          className="password-input__input"
          type={show ? 'text' : 'password'}
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          disabled={disabled}
          required={required}
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="password-input__show"
        >
          {show ? <MdOutlinePassword size="25px" /> : <MdAbc size="25px" />}
        </button>
      </div>
    </div>
  );
}

PasswordInput.defaultProps = {
  showPassword: false,
  label: '',
  value: '',
  onChange: undefined,
  required: true,
  disabled: false,
  placeholder: '',
  id: 'password',
  name: '',
  orientation: 'vertical',
};

export default PasswordInput;
