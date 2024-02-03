/* eslint jsx-a11y/label-has-associated-control: off */

import React, { useEffect, useState } from 'react';
import './SignInScreen.css';
import { Link } from 'react-router-dom';
import { loginUser } from '../functions';
import PasswordInput from '../components/PasswordInput';
import BackButton from '../components/BackButton';

function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    // Perform form validation here
    if (!email || !password) {
      setError('Please fill in all required fields.');
      return;
    }

    // ... handle successful signin or potential errors
    setError(null);

    try {
      await loginUser({ email, password });
      window.location.href = '/dashboard';
    } catch (e: any) {
      setError(e.message);
    }
  };

  useEffect(() => {
    let currentProgress = 0;

    if (email !== '') currentProgress += 50;
    if (password !== '') currentProgress += 50;

    setProgress(currentProgress);
  }, [email, password]);

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name: tName, value } = e.target;

    if (tName === 'email') setEmail(value);
    if (tName === 'password') setPassword(value);
  };

  return (
    <div className="signin-screen__container">
      <div className="signin-screen">
        <BackButton to="/" />
        <h1>Sign in to your account</h1>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleInputChange}
            required
          />
          <PasswordInput
            value={password}
            id="password"
            name="password"
            label="Password:"
            onChange={handleInputChange}
            orientation="vertical"
            required
          />
          <Link className="signin-screen__forgot_password" to="/forgotPassword">
            Forgot your password?
          </Link>
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${progress}%` }} />
          </div>
          <button type="submit">Sign In</button>
        </form>
        <p className="signin-screen__signup">
          Don&apos;t have an account? <Link to="/signup">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default SignInScreen;
