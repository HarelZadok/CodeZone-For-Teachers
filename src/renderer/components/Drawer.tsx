import React, { ReactNode, useEffect, useState } from 'react';
import { ScrollContainer } from 'react-nice-scroll';
import DrawerItem from './DrawerItem';
import './Drawer.css';

type DrawerProps = {
  onChange?: (activeDrawerItem: string) => void;
  children?: ReactNode;
  defaultActiveDrawerItem?: string;
};

let itemsTitles: string[] = [];

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

  useEffect(() => {
    window.addEventListener('popstate', () => {
      itemsTitles.forEach((title) => {
        if (window.location.pathname.includes(title.toLowerCase())) {
          setActiveDrawerItem(title);
        }
      });
    });
  }, []);

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

                const title = (item.props as any).title;

                if (!itemsTitles.includes(title)) {
                  itemsTitles.push(title);
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
