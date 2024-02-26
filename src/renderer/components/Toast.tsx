import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import './Toast.css';
import { setDelay } from '../functions';

type ToastProviderProps = {
  children: React.JSX.Element[] | React.JSX.Element;
};

type unsubscribe = () => void;

type ToastContextProps = {
  showToast: (
    message: any,
    duration?: number,
    durationUnit?: 'ms' | 's',
    notify?: boolean,
  ) => void;
  notifications: string[];
  deleteNotification: (index: number) => void;
  onNotification: (listener: (notification: string) => void) => unsubscribe;
  clearNotifications: () => void;
  sendNotification: (message: string) => void;
};

const ToastContext = React.createContext<ToastContextProps | undefined>(
  undefined,
);

type Toast = {
  message: any;
  duration?: number;
  durationUnit?: 'ms' | 's';
  notify?: boolean;
};

function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [isShowingToast, setIsShowingToast] = useState(false);
  const animationRef = useRef<HTMLDivElement>(null);
  const [notifications, setNotifications] = useState<string[]>([]);
  const listeners = useRef<((notification: string) => void)[]>([]);

  const onNotification = (listener: (notification: string) => void) => {
    listeners.current.push(listener);

    return () => {
      listeners.current = listeners.current.filter((l) => l !== listener);
    };
  };

  const sendNotification = (message: string) => {
    setNotifications((prevNotifications) => [...prevNotifications, message]);

    listeners.current.forEach((listener) => listener(message));
  };

  const showToast = useMemo(() => {
    return (
      message: any,
      duration?: number,
      durationUnit?: 'ms' | 's',
      notify?: boolean,
    ) => {
      if (notify) {
        sendNotification(message);
      }

      setToasts((prevState) => [
        ...prevState,
        {
          message,
          duration: duration ?? 5000,
          durationUnit: durationUnit ?? 'ms',
        },
      ]);
    };
  }, []);

  const showNextToast = useCallback(async () => {
    if (toasts.length > 0) {
      setIsShowingToast(true);

      await setDelay(
        toasts[0].duration! * (toasts[0].durationUnit === 's' ? 1000 : 1),
      );

      setToasts((prevToasts) => prevToasts.slice(1));
      setIsShowingToast(false);
    }
  }, [toasts]);

  const deleteNotification = useCallback((index: number) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((_, i) => i !== index),
    );
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  useEffect(() => {
    if (!isShowingToast) {
      showNextToast();
    }
  }, [isShowingToast, showNextToast, toasts]);

  const contextValue = useMemo(
    () => ({
      showToast,
      notifications,
      deleteNotification,
      onNotification,
      clearNotifications,
      sendNotification,
    }),
    [
      showToast,
      notifications,
      deleteNotification,
      onNotification,
      clearNotifications,
      sendNotification,
    ],
  );

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <div className="toast__container">
        {toasts.length > 0 && isShowingToast && (
          <div
            ref={animationRef}
            className="toast__notification"
            style={{
              animationDuration: `${toasts[0]?.duration}${toasts[0]?.durationUnit}`,
            }}
          >
            {toasts[0]?.message}
          </div>
        )}
      </div>
    </ToastContext.Provider>
  );
}

function useToast() {
  const context = React.useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context.showToast;
}

function useNotifications() {
  const context = React.useContext(ToastContext);

  if (!context) {
    throw new Error('useNotifications must be used within a ToastProvider');
  }

  return {
    notifications: context.notifications,
    deleteNotification: context.deleteNotification,
    onNotification: context.onNotification,
    clearNotifications: context.clearNotifications,
    sendNotification: context.sendNotification,
  };
}

export { ToastProvider, useToast, useNotifications };
