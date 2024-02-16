/* eslint jsx-a11y/label-has-associated-control: off */

import React, { useState } from 'react';
import './ForgotPasswordScreen.css';
import { useNavigate } from 'react-router';
import BackButton from '../components/BackButton';
import { useToast } from '../components/Toast';
import { emailResetPassword } from '../functions';

function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [linkSent, setLinkSent] = useState(false);
  const showToast = useToast();
  const navigate = useNavigate();

  const sendLink = async () => {
    try {
      await emailResetPassword(email);
      showToast(
        'A link was sent to your email. Check your inbox or spam folder for the code.',
        5,
        's',
      );
      setLinkSent(true);
    } catch (error: any) {
      showToast(error.message, 5, 's');
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (linkSent) navigate('/login');
    else sendLink();
  };

  const handleResend = () => {
    sendLink();
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
            disabled={linkSent}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {linkSent && (
            <button
              className="forgot-password-screen__reset_code"
              type="button"
              onClick={handleResend}
            >
              Resend link
            </button>
          )}
          <button className="forgot-password-screen__submit" type="submit">
            {linkSent ? 'Continue' : 'Send link '}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPasswordScreen;
