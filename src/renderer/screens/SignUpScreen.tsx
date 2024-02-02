/* eslint jsx-a11y/label-has-associated-control: off */

import React, { useEffect, useState } from 'react';
import './SignUpScreen.css';

function SignUpScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // Perform form validation here
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all required fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // ... handle successful signup or potential errors
    setError(null);
  };

  useEffect(() => {
    let currentProgress = 0;

    if (name !== '') currentProgress += 25;
    if (email !== '') currentProgress += 25;
    if (password !== '') currentProgress += 25;
    if (confirmPassword !== '') currentProgress += 25;

    setProgress(currentProgress);
  }, [name, email, password, confirmPassword]);

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name: tName, value } = e.target;

    if (tName === 'name') setName(value);
    if (tName === 'email') setEmail(value);
    if (tName === 'password') setPassword(value);
    if (tName === 'confirmPassword') setConfirmPassword(value);
  };

  return (
    <div className="signup-screen__container">
      <div className="signup-screen">
        <h1>Create Your Account</h1>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleInputChange}
            required
          />
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${progress}%` }} />
          </div>
          <button type="submit">Sign Up</button>
        </form>
        <p className="signup-screen__login">
          Already have an account? <a href="/login">Log in</a>
        </p>
      </div>
    </div>
  );
}

export default SignUpScreen;
