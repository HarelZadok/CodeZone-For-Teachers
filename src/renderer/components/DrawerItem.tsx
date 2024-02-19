import React, { useEffect } from 'react';
import './DrawerItem.css';
import { useNavigate } from 'react-router';
import { IconType } from 'react-icons';

type DrawerItemProps = {
  activeDrawerItem?: string;
  setActiveDrawerItem?: (title: string) => void;
  Icon: IconType;
  IconOutline: IconType;
  title: string;
  to?: string;
};

const DrawerItem = ({
  activeDrawerItem,
  setActiveDrawerItem,
  Icon,
  IconOutline,
  title,
  to,
}: DrawerItemProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (setActiveDrawerItem) {
      setActiveDrawerItem(title);
    }
  };

  useEffect(() => {
    if (activeDrawerItem === title && to) {
      navigate(to);
    }
  }, [activeDrawerItem]);

  return (
    <div onClick={handleClick} className="drawer-item">
      {activeDrawerItem === title ? (
        <Icon
          style={{
            fontSize: '35px',
            backgroundColor: '#039be5',
            padding: '13px',
            borderRadius: '17px',
            color: '#fff',
          }}
        />
      ) : (
        <IconOutline
          style={{
            fontSize: '35px',
            backgroundColor: '#00000010',
            padding: '13px',
            borderRadius: '17px',
            color: '#039be5',
          }}
        />
      )}
      <span style={{ color: activeDrawerItem === title ? '#039be5' : 'black' }}>
        {title}
      </span>
    </div>
  );
};

export default DrawerItem;
