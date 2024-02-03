/* eslint jsx-a11y/click-events-have-key-events: off, jsx-a11y/no-static-element-interactions: off, react/jsx-props-no-spreading: off */

import { useLocation, Routes, Route } from 'react-router-dom';
import React, { useEffect } from 'react';
import './App.css';
import { FaRegWindowMinimize } from 'react-icons/fa6';
import { TbWindowMaximize, TbWindowMinimize } from 'react-icons/tb';
import { IoClose } from 'react-icons/io5';
import { ScrollContainer, useGlobalState } from 'react-nice-scroll';
import 'react-nice-scroll/dist/styles.css';
import StartPageScreen from './screens/StartPageScreen';
import SignUpScreen from './screens/SignUpScreen';
import SignInScreen from './screens/SignInScreen';
import DashboardScreen from './screens/DashboardScreen';

function App() {
  const [maximized, setMaximized] = React.useState(false);

  window.electron.ipcRenderer.on('maximized', () => {
    setMaximized(true);
  });

  window.electron.ipcRenderer.on('unmaximized', () => {
    setMaximized(false);
  });

  const minimize = () => {
    window.electron.ipcRenderer.sendMessage('minimize');
  };

  const maximize = () => {
    window.electron.ipcRenderer.sendMessage('toggle_maximized');
  };

  const close = () => {
    window.electron.ipcRenderer.sendMessage('close');
  };

  const [smoothScrollBar] = useGlobalState('smoothScrollBar');

  const { pathname } = useLocation();

  useEffect(() => {
    if (smoothScrollBar) {
      smoothScrollBar.update();
      smoothScrollBar.scrollTo(0, 0, 800);
    }
  }, [smoothScrollBar, pathname]);

  return (
    <div className="app__container">
      <div className="app__titlebar">
        <div className="app__draggable">
          <div className="app__title">Code Zone</div>
        </div>
        <div className="app__window-controls">
          <div onClick={minimize} className="app__window-control--minimize">
            <FaRegWindowMinimize size="15px" />
          </div>
          <div onClick={maximize} className="app__window-control--expand">
            {maximized ? (
              <TbWindowMinimize size="20px" />
            ) : (
              <TbWindowMaximize size="20px" />
            )}
          </div>
          <div onClick={close} className="app__window-control--close">
            <IoClose size="25px" />
          </div>
        </div>
      </div>
      <div className="app_scroll-container">
        <ScrollContainer>
          <div className="app__body">
            <Routes>
              <Route path="/" element={<StartPageScreen />} />
              <Route path="signup" element={<SignUpScreen />} />
              <Route path="login" element={<SignInScreen />} />
              <Route path="dashboard" element={<DashboardScreen />} />
            </Routes>
          </div>
        </ScrollContainer>
      </div>
    </div>
  );
}

export default App;
