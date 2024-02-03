/* eslint jsx-a11y/label-has-associated-control: off */

import React, { useState } from 'react';
import './ForgotPasswordScreen.css';
import BackButton from '../components/BackButton';

function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [code, setCode] = useState(['', '', '', '', '', '']);

  return (
    <div className="forgot-password-screen__container">
      <div className="forgot-password-screen">
        <BackButton to="/login" />
        <h1>Forgot your password</h1>
        {error && <p className="error">{error}</p>}
        <form>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="forgot-password-screen__code_container">
            <input
              type="number"
              id="code-input-0"
              maxLength={1}
              value={code[0]}
              onChange={(e) => {
                setCode((prev) => {
                  const newValue = [...prev];
                  newValue[0] = e.target.value.charAt(0);
                  return newValue;
                });

                if (e.target.value.length === 1) {
                  document.getElementById('code-input-1')?.focus();
                }
              }}
            />
            <input
              type="number"
              id="code-input-1"
              maxLength={1}
              value={code[1]}
              onChange={(e) => {
                setCode((prev) => {
                  const newValue = [...prev];
                  newValue[1] = e.target.value.charAt(0);
                  return newValue;
                });

                if (e.target.value.length === 1) {
                  document.getElementById('code-input-2')?.focus();
                }
              }}
            />
            <input
              type="number"
              id="code-input-2"
              maxLength={1}
              value={code[2]}
              onChange={(e) => {
                setCode((prev) => {
                  const newValue = [...prev];
                  newValue[2] = e.target.value.charAt(0);
                  return newValue;
                });

                if (e.target.value.length === 1) {
                  document.getElementById('code-input-3')?.focus();
                }
              }}
            />
            <input
              type="number"
              id="code-input-3"
              maxLength={1}
              value={code[3]}
              onChange={(e) => {
                setCode((prev) => {
                  const newValue = [...prev];
                  newValue[3] = e.target.value.charAt(0);
                  return newValue;
                });

                if (e.target.value.length === 1) {
                  document.getElementById('code-input-4')?.focus();
                }
              }}
            />
            <input
              type="number"
              id="code-input-4"
              maxLength={1}
              value={code[4]}
              onChange={(e) => {
                setCode((prev) => {
                  const newValue = [...prev];
                  newValue[4] = e.target.value.charAt(0);
                  return newValue;
                });

                if (e.target.value.length === 1) {
                  document.getElementById('code-input-5')?.focus();
                }
              }}
            />
            <input
              type="number"
              id="code-input-5"
              maxLength={1}
              value={code[5]}
              onChange={(e) => {
                setCode((prev) => {
                  const newValue = [...prev];
                  newValue[5] = e.target.value.charAt(0);
                  return newValue;
                });

                if (e.target.value.length === 1) {
                  document.getElementById('code-input-5')?.blur();
                }
              }}
            />
          </div>
          <button type="submit">Send code</button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPasswordScreen;
