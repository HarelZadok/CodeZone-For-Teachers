import React, { useEffect, useState } from 'react';
import { logOut, useAppStyle, useListener } from '../functions';
import './MainScreen.css';
import { ScrollContainer } from 'react-nice-scroll';
import Drawer from '../components/Drawer';
import { Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router';
import DrawerItem from '../components/DrawerItem';
import { MdOutlineSpaceDashboard, MdSpaceDashboard } from 'react-icons/md';
import { IoPeople, IoPeopleOutline } from 'react-icons/io5';
import { HiOutlineUser, HiUser } from 'react-icons/hi2';
import {
  RiSettings3Fill,
  RiSettings3Line,
  RiShutDownLine,
} from 'react-icons/ri';
import { MdTask, MdOutlineTask } from 'react-icons/md';
import LoadingScreen from './LoadingScreen';

function MainScreen() {
  const { setAppStyle, resetAppStyle, setTitlebarStyle, resetTitlebarStyle } =
    useAppStyle();

  const [isLoading, setIsLoading] = useState(false);

  useListener('mouseup', (e) => {
    if (e.button === 3 || e.button === 4) {
      // e.preventDefault();
    }
  });

  useEffect(() => {
    setAppStyle((style) => ({
      ...style,
      background: 'linear-gradient(90deg, #fff 200px, #039be510 200px)',
    }));

    setTitlebarStyle((style) => ({
      ...style,
      foregroundColor: 'black',
    }));

    return () => {
      resetAppStyle();
      resetTitlebarStyle();
    };
  }, []);

  const handleLogout = async () => {
    setIsLoading(true);
    await logOut();
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="dashboard-screen__container">
      <Drawer defaultActiveDrawerItem="Dashboard">
        <DrawerItem
          Icon={MdSpaceDashboard}
          IconOutline={MdOutlineSpaceDashboard}
          title="Dashboard"
          to="/main_dashboard"
        />
        <DrawerItem
          Icon={MdTask}
          IconOutline={MdOutlineTask}
          title="Tasks"
          to="/main_tasks"
        />
        <DrawerItem
          Icon={IoPeople}
          IconOutline={IoPeopleOutline}
          title="Students"
          to="/main_students"
        />
        <DrawerItem
          Icon={HiUser}
          IconOutline={HiOutlineUser}
          title="Profile"
          to="/main_profile"
        />
        <DrawerItem
          Icon={RiSettings3Fill}
          IconOutline={RiSettings3Line}
          title="Settings"
          to="/main_settings"
        />
        <div onClick={handleLogout} className="drawer__item-logout">
          <RiShutDownLine size="18px" /> Log out
        </div>
      </Drawer>
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          flexDirection: 'column',
        }}
      >
        <ScrollContainer>
          <div className="dashboard-screen__body">
            <Routes>
              <Route path="/main_dashboard" element={<h1>Dashboard</h1>} />
              <Route path="/main_tasks" element={<h1>Tasks</h1>} />
              <Route path="/main_students" element={<h1>Students</h1>} />
              <Route path="/main_profile" element={<h1>Profile</h1>} />
              <Route path="/main_settings" element={<h1>Settings</h1>} />
            </Routes>
          </div>
        </ScrollContainer>
      </div>
    </div>
  );
}

export default MainScreen;
