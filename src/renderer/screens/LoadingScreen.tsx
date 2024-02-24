import React from 'react';
import { BallTriangle } from 'react-loader-spinner';
import './LoadingScreen.css';

function LoadingScreen() {
  return (
    <div className="loading-screen__container">
      <BallTriangle
        height={150}
        width={150}
        radius={5}
        color="#039be5"
        ariaLabel="ball-triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
      <p className="loading-screen__label">Loading...</p>
    </div>
  );
}

export default LoadingScreen;
