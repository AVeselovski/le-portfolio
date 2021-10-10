import { useContext } from "react";

import NotificationContext from "../../store/notificatons";

import Header from "./Header";
import Notification from "../ui/Notification";

export default function Layout({ children }) {
  const { notification } = useContext(NotificationContext);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="main">{children}</main>
      <footer className="footer">This is footer</footer>

      {notification && (
        <Notification
          message={notification.message}
          status={notification.status}
        />
      )}
    </div>
  );
}
