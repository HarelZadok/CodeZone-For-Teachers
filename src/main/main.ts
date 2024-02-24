/* eslint global-require: off, no-console: off, promise/always-return: off */

import path from 'path';
import { app, BrowserWindow, shell, ipcMain } from 'electron';
import { Deeplink } from 'electron-deeplink';
import isDev from 'electron-is-dev';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import Store from 'electron-store';

const store = new Store();

let mainWindow: BrowserWindow | null = null;

let isMaximized = false;

ipcMain.setMaxListeners(0);
app.setMaxListeners(0);

process.setMaxListeners(0);

const devTools = true;

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

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

ipcMain.on('check_maximized', (event) => {
  event.returnValue = mainWindow?.isMaximized();
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

const updateBounds = (
  property: 'maximize' | 'unmaximize' | 'resize' | 'move',
) => {
  if (!mainWindow) {
    throw new Error('"mainWindow" is not defined');
  }

  switch (property) {
    case 'maximize':
      isMaximized = true;
      mainWindow?.webContents.send('maximized');
      store.set('windowBounds', {
        // @ts-ignore
        ...store.get('windowBounds'),
        maximized: mainWindow.isMaximized(),
      });
      break;
    case 'unmaximize':
      isMaximized = false;
      mainWindow?.webContents.send('unmaximized');
      store.set('windowBounds', {
        // @ts-ignore
        ...store.get('windowBounds'),
        maximized: mainWindow.isMaximized(),
      });
      break;
    case 'resize':
      store.set('windowBounds', {
        // @ts-ignore
        ...store.get('windowBounds'),
        width: mainWindow.getBounds().width,
        height: mainWindow.getBounds().height,
      });
      break;
    case 'move':
      store.set('windowBounds', {
        // @ts-ignore
        ...store.get('windowBounds'),
        x: mainWindow.getBounds().x,
        y: mainWindow.getBounds().y,
      });
      break;
    default:
      break;
  }
};

const getBounds = (defaultValues?: any) => {
  return store.get('windowBounds', defaultValues) as any;
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const { x, y, width, height, maximized } = getBounds({
    x: 0,
    y: 0,
    width: 1300,
    height: 800,
    maximized: false,
  });

  mainWindow = new BrowserWindow({
    width, // Initial width
    height, // Initial height
    minWidth: 850, // Minimum allowed width
    minHeight: 550, // Minimum allowed height
    x: 0,
    y: 0,
    title: 'Code Zone',
    frame: false,
    show: false,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
      devTools: devTools,
    },
  });

  mainWindow.setMaxListeners(0);

  await mainWindow.loadURL('http://localhost:1212');

  mainWindow!.setPosition(x, y);
  if (maximized) {
    mainWindow!.maximize();
    updateBounds('maximize');
  }

  mainWindow.show();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.on('maximize', () => {
    updateBounds('maximize');
  });

  mainWindow.on('resize', () => {
    if (!mainWindow?.isMaximized()) {
      updateBounds('resize');
    }
  });

  mainWindow.on('move', () => {
    if (!mainWindow?.isMaximized()) {
      updateBounds('move');
    }
  });

  mainWindow.on('unmaximize', () => {
    updateBounds('unmaximize');
  });

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  const protocol = isDev ? 'codezone-dev' : 'codezone-app';
  const deeplink = new Deeplink({ app, mainWindow, protocol, isDev });

  deeplink.on('received', (link: any) => {
    mainWindow?.webContents.send('deeplink', link);
  });

  // eslint-disable-next-line
  new AppUpdater();
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
    createWindow();
    app.on('activate', () => {
      // On macOS, it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
