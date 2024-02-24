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

type ToastContextProps = {
  showToast: (
    message: any,
    duration?: number,
    durationUnit?: 'ms' | 's',
  ) => void;
};

const ToastContext = React.createContext<ToastContextProps | undefined>(
  undefined,
);

type Toast = {
  message: any;
  duration?: number;
  durationUnit?: 'ms' | 's';
};

function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [isShowingToast, setIsShowingToast] = useState(false);
  const animationRef = useRef<HTMLDivElement>(null);

  const showToast = useMemo(() => {
    return (message: any, duration?: number, durationUnit?: 'ms' | 's') => {
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

  useEffect(() => {
    if (!isShowingToast) {
      showNextToast();
    }
  }, [isShowingToast, showNextToast, toasts]);

  const contextValue = useMemo(() => ({ showToast }), [showToast]);

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

export { ToastProvider, useToast };
