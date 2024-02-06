import React, { useState } from 'react';
import './CodeInput.css';

type CodeInputProps = {
  onChange?: (code: string) => void;
  visible?: boolean;
};

function CodeInput({ onChange, visible }: CodeInputProps) {
  const [code, setCode] = useState(['', '', '', '', '', '']);

  if (!visible) {
    return null;
  }

  return (
    <div className="code-input">
      <input
        className="code-input__input"
        type="number"
        id="code-input-0"
        maxLength={1}
        value={code[0]}
        onChange={(e) => {
          setCode((prev) => {
            const newValue = [...prev];
            newValue[0] = e.target.value.charAt(0);
            if (onChange) onChange(newValue.join(''));
            return newValue;
          });

          if (e.target.value.length === 1) {
            document.getElementById('code-input-1')?.focus();
          }
        }}
      />
      <input
        className="code-input__input"
        type="number"
        id="code-input-1"
        maxLength={1}
        value={code[1]}
        onChange={(e) => {
          setCode((prev) => {
            const newValue = [...prev];
            newValue[1] = e.target.value.charAt(0);
            if (onChange) onChange(newValue.join(''));
            return newValue;
          });

          if (e.target.value.length === 1) {
            document.getElementById('code-input-2')?.focus();
          }
        }}
      />
      <input
        className="code-input__input"
        type="number"
        id="code-input-2"
        maxLength={1}
        value={code[2]}
        onChange={(e) => {
          setCode((prev) => {
            const newValue = [...prev];
            newValue[2] = e.target.value.charAt(0);
            if (onChange) onChange(newValue.join(''));
            return newValue;
          });

          if (e.target.value.length === 1) {
            document.getElementById('code-input-3')?.focus();
          }
        }}
      />
      <input
        className="code-input__input"
        type="number"
        id="code-input-3"
        maxLength={1}
        value={code[3]}
        onChange={(e) => {
          setCode((prev) => {
            const newValue = [...prev];
            newValue[3] = e.target.value.charAt(0);
            if (onChange) onChange(newValue.join(''));
            return newValue;
          });

          if (e.target.value.length === 1) {
            document.getElementById('code-input-4')?.focus();
          }
        }}
      />
      <input
        className="code-input__input"
        type="number"
        id="code-input-4"
        maxLength={1}
        value={code[4]}
        onChange={(e) => {
          setCode((prev) => {
            const newValue = [...prev];
            newValue[4] = e.target.value.charAt(0);
            if (onChange) onChange(newValue.join(''));
            return newValue;
          });

          if (e.target.value.length === 1) {
            document.getElementById('code-input-5')?.focus();
          }
        }}
      />
      <input
        className="code-input__input"
        type="number"
        id="code-input-5"
        maxLength={1}
        value={code[5]}
        onChange={(e) => {
          setCode((prev) => {
            const newValue = [...prev];
            newValue[5] = e.target.value.charAt(0);
            if (onChange) onChange(newValue.join(''));
            return newValue;
          });

          if (e.target.value.length === 1) {
            document.getElementById('code-input-5')?.blur();
          }
        }}
      />
    </div>
  );
}

CodeInput.defaultProps = {
  onChange: undefined,
  visible: true,
};

export default CodeInput;
