import React, { ReactNode, useEffect, useState } from 'react';
import { ScrollContainer } from 'react-nice-scroll';
import DrawerItem from './DrawerItem';
import './Drawer.css';

type DrawerProps = {
  onChange?: (activeDrawerItem: string) => void;
  children?: ReactNode;
  defaultActiveDrawerItem?: string;
};

const Drawer = ({
  onChange,
  children,
  defaultActiveDrawerItem,
}: DrawerProps) => {
  const [activeDrawerItem, setActiveDrawerItem] = useState(
    defaultActiveDrawerItem ?? '',
  );

  useEffect(() => {
    if (onChange) {
      onChange(activeDrawerItem.toLowerCase());
    }
  }, [activeDrawerItem]);

  return (
    <div
      style={{
        display: 'flex',
        width: '200px',
        height: '100%',
        flexDirection: 'column',
      }}
    >
      <ScrollContainer>
        <div className="drawer">
          {React.Children.count(children) === 1
            ? children
            : React.Children.map(children, (item: ReactNode) => {
                if (!item) {
                  return null;
                }

                item = item as React.JSX.Element;

                if (item.type !== DrawerItem) {
                  return item;
                }
                return (
                  <DrawerItem
                    activeDrawerItem={activeDrawerItem}
                    setActiveDrawerItem={setActiveDrawerItem}
                    {...item.props}
                  />
                );
              })}
        </div>
      </ScrollContainer>
    </div>
  );
};

export default Drawer;
