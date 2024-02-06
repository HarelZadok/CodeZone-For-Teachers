/* eslint jsx-a11y/label-has-associated-control: off */

import React, { useState } from 'react';
import './ForgotPasswordScreen.css';
import BackButton from '../components/BackButton';
import CodeInput from '../components/CodeInput';
import { useToast } from '../components/Toast';
import { emailResetPassword } from '../functions';

function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [code, setCode] = useState('');
  const showToast = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!codeSent) {
      try {
        await emailResetPassword(email);
        showToast(
          'A code sent to your email. Check your inbox or spam folder for the code.',
          5,
          's',
        );
      } catch (error: any) {
        showToast(error.message, 5, 's');
      }
      setCodeSent(true);
    }
  };

  const handleResendCode = async () => {
    try {
      await emailResetPassword(email);
      showToast(
        'A code sent to your email. Check your inbox or spam folder for the code.',
        5,
        's',
      );
    } catch (error: any) {
      showToast(error.message, 5, 's');
    }
  };

  return (
    <div className="forgot-password-screen__container">
      <div className="forgot-password-screen">
        <BackButton to="/login" />
        <h1>Forgot your password</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            disabled={codeSent}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {codeSent && (
            <button
              className="forgot-password-screen__reset_code"
              type="button"
              onClick={handleResendCode}
            >
              Resend code
            </button>
          )}
          <CodeInput onChange={setCode} visible={codeSent} />
          <button className="forgot-password-screen__submit" type="submit">
            {codeSent ? 'Continue' : 'Send code'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPasswordScreen;
