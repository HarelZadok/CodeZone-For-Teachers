import React, { useEffect, useRef, useState } from 'react';
import './NotificationsPanel.css';
import { ScrollContainer } from 'react-nice-scroll';
import { TbTrashX } from 'react-icons/tb';
import { useOnChange } from '../functions';

let notificationsLength = 0;

const NotificationsPanel = ({
  notificationsHandler,
}: {
  notificationsHandler: {
    notifications: string[];
    deleteNotification: (index: number) => void;
    clearNotifications: () => void;
  };
}) => {
  const { deleteNotification, notifications: notificationsList } =
    notificationsHandler;

  const [notifications, setNotifications] = useState<string[]>([]);

  const divRef = React.useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = React.useState(false);

  const unreadNotificationsIndexes = useRef<number[]>([]);

  useEffect(() => {
    const handleOverflowCheck = () => {
      const divElement = divRef.current;
      if (divElement) {
        const hasOverflow = divElement.scrollHeight > divElement.clientHeight;
        setIsOverflowing(hasOverflow);
      }
    };

    handleOverflowCheck();
  }, [notifications]);

  useEffect(() => {
    for (let i = notificationsLength; i < notificationsList.length; i++) {
      unreadNotificationsIndexes.current.push(i);
    }

    notificationsLength = notificationsList.length;

    setNotifications(notificationsList);
  }, [notificationsList]);

  useOnChange(() => {
    notificationsLength = notifications.length;
  }, [notifications]);

  const Notification = (props: { notification: string; index: number }) => {
    const isUnread = unreadNotificationsIndexes.current.includes(props.index);

    return (
      <div className="notifications-panel__notification">
        {isUnread && <div className="notifications-panel__notification-dot" />}
        {props.notification}
        <TbTrashX
          className="notifications-panel__notification-delete"
          size="20px"
          onClick={() => {
            deleteNotification(props.index);
            setNotifications(
              notifications.filter((_, index) => index !== props.index),
            );

            unreadNotificationsIndexes.current =
              unreadNotificationsIndexes.current.filter(
                (index) => index !== props.index,
              );

            unreadNotificationsIndexes.current =
              unreadNotificationsIndexes.current.map((index) =>
                index > props.index ? index - 1 : index,
              );
          }}
        />
      </div>
    );
  };

  const body = (
    <div ref={divRef} className="notifications-panel__content">
      {notifications.length > 0 ? (
        <>
          <div
            className="notifications-panel__clear-button"
            onClick={() => {
              notificationsHandler.clearNotifications();
              setNotifications([]);
            }}
          >
            <small style={{ fontSize: '14px' }}>Clear all</small>
          </div>
          {notifications.map((notification, index) => (
            <div key={index}>
              <div
                style={{
                  width: '100%',
                  height: '1px',
                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
                  marginBottom: '10px',
                }}
              />
              {Notification({ notification, index })}
            </div>
          ))}
        </>
      ) : (
        <div className="notifications-panel__content-empty">
          <span>No notifications</span>
        </div>
      )}
    </div>
  );

  return (
    <div className="notifications-panel">
      <h2 className="notifications-panel__title">Notifications</h2>
      {isOverflowing ? <ScrollContainer>{body}</ScrollContainer> : body}
    </div>
  );
};

export default NotificationsPanel;
