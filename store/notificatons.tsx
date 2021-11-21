import { createContext, useEffect, useState } from "react";

import type { INotification } from "../types";

type ContextType = {
  notification: INotification | null;
  showNotification: ({ message, status }: INotification) => void;
  hideNotification: () => void;
};

const NotificationContext = createContext<ContextType>({
  notification: null,
  showNotification: function () {},
  hideNotification: function () {},
});

export default NotificationContext;

export function NotificationProvider({ children }: { children: JSX.Element }) {
  const [notification, setNotification] = useState<INotification | null>(null);

  function addNotification({ message, status = "error" }: INotification) {
    const msg = typeof message === "object" ? JSON.stringify(message) : message;
    setNotification({
      message: msg,
      status,
    });
  }

  function removeNotification() {
    setNotification(null);
  }

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        removeNotification();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [notification]);

  const context = {
    notification,
    showNotification: addNotification,
    hideNotification: removeNotification,
  };

  return (
    <NotificationContext.Provider value={context}>
      {children}
    </NotificationContext.Provider>
  );
}
