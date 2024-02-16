import React, { useEffect } from 'react';
import './StartPageScreen.css';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { useListener } from '../functions';
import ConfirmExit from '../components/ConfirmExit';
import { getAuth } from 'firebase/auth';

Modal.setAppElement('#root');

function StartPageScreen() {
  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  useListener('mouseup', (e) => {
    if (e.button === 3) {
      e.preventDefault();

      setModalIsOpen(true);
    }
  });

  return (
    <div className="start-page-screen__container">
      <Modal isOpen={modalIsOpen} className="confirm-exit__modal">
        <ConfirmExit onClose={setModalIsOpen} />
      </Modal>
      <h1 className="start-page-screen__title">
        Welcome to Code Zone, Teacher!
      </h1>
      <p className="start-page-screen__description">
        Engage your students in interactive coding practice with Code Zone.
        tasks, monitor progress, and provide meaningful feedback, all in one
        place.
      </p>
      <div className="start-page-screen__features">
        <div className="start-page-screen__feature">
          <h2>Interactive Code Samples</h2>
          <p>
            Let students experiment with real code right on the landing page!
          </p>
        </div>
        <div className="start-page-screen__feature">
          <h2>Visualize Student Progress</h2>
          <p>Track learning journeys with dynamic progress charts.</p>
        </div>
        <div className="start-page-screen__feature">
          <h2>Gamified Learning with Badges</h2>
          <p>
            Motivate students with fun and rewarding badges for achievements.
          </p>
        </div>
        <div className="start-page-screen__feature">
          <h2>Collaborative Coding Projects</h2>
          <p>Empower students to work together and build amazing things.</p>
        </div>
        <div className="start-page-screen__feature">
          <h2>Real-time Feedback & Support</h2>
          <p>Never feel lost with instant help from our dedicated team.</p>
        </div>
        <div className="start-page-screen__feature">
          <h2>Real Teachers, Real Success</h2>
          <p>Transform student coding journeys. Join Code Zone teachers.</p>
        </div>
      </div>
      <div className="start-page-screen__actions">
        <Link to="/signup" className="start-page-screen__button">
          Sign Up
        </Link>
        <Link to="/login" className="start-page-screen__button">
          Log In
        </Link>
      </div>
    </div>
  );
}

export default StartPageScreen;
