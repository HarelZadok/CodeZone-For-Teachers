/* eslint global-require: off, no-console: off, promise/always-return: off */

import path from 'path';
import { app, BrowserWindow, shell, ipcMain, screen } from 'electron';

let mainWindow: BrowserWindow | null = null;

let isMaximized = false;

ipcMain.on('minimize', () => {
  mainWindow?.minimize();
});

ipcMain.on('toggle_maximized', () => {
  if (isMaximized) {
    mainWindow?.unmaximize();
  } else {
    mainWindow?.maximize();
  }
});

ipcMain.on('close', () => {
  mainWindow?.close();
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

let currentDisplay: any;

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload,
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  mainWindow = new BrowserWindow({
    width: 1300, // Initial width
    height: 800, // Initial height
    minWidth: 850, // Minimum allowed width
    minHeight: 550, // Minimum allowed height
    x: currentDisplay.bounds.x + currentDisplay.bounds.width / 2 - 650,
    y: currentDisplay.bounds.y + currentDisplay.bounds.height / 2 - 400,
    title: 'Code Zone',
    frame: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
      webSecurity: true,
      devTools: false,
    },
  });

  mainWindow.loadURL('http://localhost:1212');

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    mainWindow.show();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.on('maximize', () => {
    isMaximized = true;
    mainWindow?.webContents.send('maximized');
  });

  mainWindow.on('unmaximize', () => {
    isMaximized = false;
    mainWindow?.webContents.send('unmaximized');
  });

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });
};

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    // eslint-disable-next-line prefer-destructuring
    currentDisplay = screen.getAllDisplays()[1];
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
