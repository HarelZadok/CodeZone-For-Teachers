import React from 'react';
import { Route, Routes } from 'react-router-dom';
import StartPageScreen from './screens/StartPageScreen';
import SignUpScreen from './screens/SignUpScreen';
import SignInScreen from './screens/SignInScreen';
import DashboardScreen from './screens/DashboardScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';

export default function Navigation() {
  return (
    <Routes>
      <Route path="/" element={<StartPageScreen />} />
      <Route path="signup" element={<SignUpScreen />} />
      <Route path="login" element={<SignInScreen />} />
      <Route path="dashboard" element={<DashboardScreen />} />
      <Route path="forgotPassword" element={<ForgotPasswordScreen />} />
    </Routes>
  );
}
