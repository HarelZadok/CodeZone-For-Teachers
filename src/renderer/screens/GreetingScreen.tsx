import React from 'react';
import './GreetingScreen.css';
import { Link } from 'react-router-dom';

function GreetingScreen() {
  return (
    <div className="greeting-screen__container">
      <h1 className="greeting-screen__title">Welcome to Code Zone, Teacher!</h1>
      <p className="greeting-screen__description">
        Engage your students in interactive coding practice with Code Zone.
        tasks, monitor progress, and provide meaningful feedback, all in one
        place.
      </p>
      <div className="greeting-screen__features">
        <div className="greeting-screen__feature">
          <h2>Interactive Code Samples</h2>
          <p>
            Let students experiment with real code right on the landing page!
          </p>
        </div>
        <div className="greeting-screen__feature">
          <h2>Visualize Student Progress</h2>
          <p>Track learning journeys with dynamic progress charts.</p>
        </div>
        <div className="greeting-screen__feature">
          <h2>Gamified Learning with Badges</h2>
          <p>
            Motivate students with fun and rewarding badges for achievements.
          </p>
        </div>
        <div className="greeting-screen__feature">
          <h2>Collaborative Coding Projects</h2>
          <p>Empower students to work together and build amazing things.</p>
        </div>
        <div className="greeting-screen__feature">
          <h2>Real-time Feedback & Support</h2>
          <p>Never feel lost with instant help from our dedicated team.</p>
        </div>
        <div className="greeting-screen__feature">
          <h2>Real Teachers, Real Success</h2>
          <p>Transform student coding journeys. Join Code Zone teachers.</p>
        </div>
      </div>
      <div className="greeting-screen__actions">
        <Link to="/signup" className="greeting-screen__button">
          Sign Up
        </Link>
        <Link to="/login" className="greeting-screen__button">
          Log In
        </Link>
      </div>
    </div>
  );
}

export default GreetingScreen;
