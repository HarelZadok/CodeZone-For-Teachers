import React from 'react';
import { useListener } from '../functions';

function DashboardScreen() {
  useListener('mouseup', (e) => {
    if (e.button === 3 || e.button === 4) {
      e.preventDefault();
    }
  });

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to the dashboard</p>
    </div>
  );
}

export default DashboardScreen;
