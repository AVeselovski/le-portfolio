import { createContext, useEffect, useState } from "react";

const NotificationContext = createContext({
  notification: null,
  setNotification: function (data) {},
  removeNotification: function () {},
});

export default NotificationContext;

export function NotificationProvider({ children }) {
  const [notification, setNotification] = useState(null);

  function addNotification(message, status = "error") {
    setNotification({
      message,
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
