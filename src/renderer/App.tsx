/* eslint jsx-a11y/click-events-have-key-events: off, jsx-a11y/no-static-element-interactions: off, react/jsx-props-no-spreading: off */

import { useLocation } from 'react-router-dom';
import React, { createContext, useEffect, useState } from 'react';
import './App.css';
import { ScrollContainer, useGlobalState } from 'react-nice-scroll';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import 'react-nice-scroll/dist/styles.css';
import { AppNavigation, AuthNavigation } from './Navigation';
import { ToastProvider } from './components/Toast';
import LoadingScreen from './screens/LoadingScreen';
import Titlebar, { titlebarProps } from './components/Titlebar';

export const AppContext = createContext({
  appStyle: {} as React.CSSProperties,
  setAppStyle: {} as React.Dispatch<React.SetStateAction<React.CSSProperties>>,
  titlebarStyle: {} as titlebarProps,
  setTitlebarStyle: {} as React.Dispatch<React.SetStateAction<titlebarProps>>,
  titlebarItems: [] as React.ReactNode[],
  setTitlebarItems: {} as React.Dispatch<
    React.SetStateAction<React.ReactNode[]>
  >,
});

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [appStyle, setAppStyle] = useState({} as React.CSSProperties);
  const [titlebarStyle, setTitlebarStyle] = useState({
    title: 'Code Zone',
    backgroundColor: 'transparent',
    foregroundColor: 'white',
  } as titlebarProps);
  const [titlebarItems, setTitlebarItems] = useState([] as React.ReactNode[]);

  const [smoothScrollBar] = useGlobalState('smoothScrollBar');

  const { pathname } = useLocation();

  useEffect(() => {
    if (smoothScrollBar) {
      smoothScrollBar.update();
      smoothScrollBar.scrollTo(0, 0, 800);
    }
  }, [smoothScrollBar, pathname]);

  useEffect(() => {
    onAuthStateChanged(getAuth(), (user) => {
      setIsAuthenticated(user !== null);
      setIsLoading(false);
    });
  }, []);

  return (
    <AppContext.Provider
      value={{
        appStyle,
        setAppStyle,
        titlebarStyle,
        setTitlebarStyle,
        titlebarItems,
        setTitlebarItems,
      }}
    >
      <div className="app__container" style={appStyle}>
        <Titlebar
          title={titlebarStyle.title}
          backgroundColor={titlebarStyle.backgroundColor}
          foregroundColor={titlebarStyle.foregroundColor}
          items={titlebarItems}
        />
        <div className="app_scroll-container">
          <ScrollContainer>
            <ToastProvider>
              <div className="app__body">
                {isLoading ? (
                  <LoadingScreen />
                ) : isAuthenticated ? (
                  <AppNavigation />
                ) : (
                  <AuthNavigation />
                )}
              </div>
            </ToastProvider>
          </ScrollContainer>
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
