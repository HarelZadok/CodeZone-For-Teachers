import React, { useEffect, useState } from 'react';
import { logOut, useAppStyle, useListener } from '../functions';
import './MainScreen.css';
import { ScrollContainer } from 'react-nice-scroll';
import Drawer from '../components/Drawer';
import { Route, Routes } from 'react-router-dom';
import DrawerItem from '../components/DrawerItem';
import {
  MdOutlineSpaceDashboard,
  MdOutlineTask,
  MdSpaceDashboard,
  MdTask,
} from 'react-icons/md';
import { IoPeople, IoPeopleOutline } from 'react-icons/io5';
import { HiOutlineUser, HiUser } from 'react-icons/hi2';
import {
  RiSettings3Fill,
  RiSettings3Line,
  RiShutDownLine,
} from 'react-icons/ri';
import { Popover } from 'antd';
import {
  PiBellSimple,
  PiBellSimpleFill,
  PiBellSimpleRinging,
} from 'react-icons/pi';
import LoadingScreen from './LoadingScreen';
import TasksScreen from './subscreens/TasksScreen';
import { useNotifications } from '../components/Toast';
import NotificationsPanel from '../components/NotificationsPanel';

function MainScreen() {
  const {
    setAppStyle,
    resetAppStyle,
    setTitlebarStyle,
    resetTitlebarStyle,
    setTitlebarItems,
  } = useAppStyle();

  const notifications = useNotifications();

  const [isLoading, setIsLoading] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isNotificationsRinging, setIsNotificationsRinging] = useState(false);

  useListener('mouseup', (e) => {
    if (e.button === 3 || e.button === 4) {
      e.preventDefault();
    }
  });

  useEffect(
    () =>
      notifications.onNotification((notification) => {
        setIsNotificationsRinging(true);
      }),
    [],
  );

  const toggleNotifications = () => {
    setIsNotificationsOpen((open) => !open);
    setIsNotificationsRinging(false);
  };

  useEffect(() => {
    setAppStyle((style) => ({
      ...style,
      background: 'linear-gradient(90deg, #fff 200px, #eff9fe 200px)',
    }));

    setTitlebarStyle((style) => ({
      ...style,
      foregroundColor: 'black',
    }));

    setTitlebarItems([
      <Popover
        content={<NotificationsPanel notificationsHandler={notifications} />}
        trigger="click"
        placement="bottomRight"
        arrow={{ pointAtCenter: true }}
        onOpenChange={toggleNotifications}
        key={0}
        destroyTooltipOnHide
      >
        <div className="main-screen__titlebar-notifications-button">
          {isNotificationsOpen ? (
            <PiBellSimpleFill size="25px" />
          ) : isNotificationsRinging ? (
            <PiBellSimpleRinging
              className="main-screen__titlebar-notifications-button-ringing"
              size="25px"
            />
          ) : (
            <PiBellSimple size="25px" />
          )}
        </div>
      </Popover>,
    ]);

    return () => {
      resetAppStyle();
      resetTitlebarStyle();
      setTitlebarItems([]);
    };
  }, [isNotificationsOpen, isNotificationsRinging]);

  const handleLogout = async () => {
    setIsLoading(true);
    await logOut();
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="main-screen__container">
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
          flex: 1,
          flexDirection: 'column',
        }}
      >
        <ScrollContainer>
          <div className="main-screen__body">
            <Routes>
              <Route path="/main_dashboard" element={<h1>Dashboard</h1>} />
              <Route path="/main_tasks" element={<TasksScreen />} />
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
