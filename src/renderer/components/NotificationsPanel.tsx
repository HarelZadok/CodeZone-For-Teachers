import React, { useEffect, useState } from 'react';
import './NotificationsPanel.css';
import { ScrollContainer } from 'react-nice-scroll';
import { TbTrashX } from 'react-icons/tb';

const NotificationsPanel = ({
  notificationsHandler,
}: {
  notificationsHandler: {
    notifications: string[];
    deleteNotification: (notification: string) => void;
  };
}) => {
  const { deleteNotification, notifications: notificationsList } =
    notificationsHandler;

  const [notifications, setNotifications] = useState<string[]>([]);

  const divRef = React.useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = React.useState(false);

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
    setNotifications(notificationsList);
  }, [notificationsList]);

  const Notification = (props: { notification: string; index: number }) => {
    return (
      <div key={props.index} className="notifications-panel__notification">
        {props.notification}
        <TbTrashX
          className="notifications-panel__notification-delete"
          size="20px"
          onClick={() => {
            deleteNotification(props.notification);
            setNotifications(
              notifications.filter((n) => n !== props.notification),
            );
          }}
        />
      </div>
    );
  };

  const body = (
    <div ref={divRef} className="notifications-panel__content">
      {notifications.length > 0 ? (
        notifications.map((notification, index) =>
          Notification({ notification, index }),
        )
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
