import React from 'react';
import { Route, Routes } from 'react-router-dom';
import StartPageScreen from './screens/StartPageScreen';
import SignUpScreen from './screens/SignUpScreen';
import SignInScreen from './screens/SignInScreen';
import MainScreen from './screens/MainScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';

export function AuthNavigation() {
  return (
    <Routes>
      <Route path="/" element={<StartPageScreen />} />
      <Route path="signup" element={<SignUpScreen />} />
      <Route path="login" element={<SignInScreen />} />
      <Route path="forgotPassword" element={<ForgotPasswordScreen />} />
    </Routes>
  );
}

export function AppNavigation() {
  return (
    <Routes>
      <Route path="*" element={<MainScreen />} />
    </Routes>
  );
}
