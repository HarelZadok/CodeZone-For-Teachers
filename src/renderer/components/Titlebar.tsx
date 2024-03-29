import React from 'react';
import { FaRegWindowMinimize } from 'react-icons/fa6';
import { TbWindowMaximize, TbWindowMinimize } from 'react-icons/tb';
import { IoClose } from 'react-icons/io5';
import './Titlebar.css';
import { isMaximized } from '../functions';

export type titlebarProps = {
  title: string;
  items?: React.ReactNode;
  backgroundColor?: string;
  foregroundColor?: string;
};

function Titlebar(props: titlebarProps) {
  const [maximized, setMaximized] = React.useState(isMaximized());

  window.electron.ipcRenderer.onWindow('maximized', () => {
    setMaximized(true);
  });

  window.electron.ipcRenderer.onWindow('unmaximized', () => {
    setMaximized(false);
  });

  const minimize = () => {
    window.electron.ipcRenderer.sendWindowMessage('minimize');
  };

  const maximize = () => {
    window.electron.ipcRenderer.sendWindowMessage('toggle_maximized');
  };

  const close = () => {
    window.electron.ipcRenderer.sendWindowMessage('close');
  };

  return (
    <div
      className="titlebar__titlebar"
      style={{ backgroundColor: props.backgroundColor ?? undefined }}
    >
      <div className="titlebar__draggable">
        <div
          className="titlebar__title"
          style={{ color: props.foregroundColor ?? undefined }}
        >
          {props.title}
        </div>
      </div>
      <div className="titlebar__window-controls">
        <div
          onClick={close}
          className="titlebar__window-control--close"
          style={{ color: props.foregroundColor ?? undefined }}
        >
          <IoClose size="25px" />
        </div>
        <div
          onClick={maximize}
          className="titlebar__window-control--expand"
          style={{ color: props.foregroundColor ?? undefined }}
        >
          {maximized ? (
            <TbWindowMinimize size="20px" />
          ) : (
            <TbWindowMaximize size="20px" />
          )}
        </div>
        <div
          onClick={minimize}
          className="titlebar__window-control--minimize"
          style={{ color: props.foregroundColor ?? undefined }}
        >
          <FaRegWindowMinimize size="15px" />
        </div>
        {props.items && React.Children.count(props.items) > 0 && (
          <>
            <div className="titlebar__window-control--separator" />
            <div
              className="titlebar__window-control--items"
              style={{ color: props.foregroundColor ?? undefined }}
            >
              {props.items}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Titlebar;
