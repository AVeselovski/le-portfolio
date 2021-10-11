import { useContext } from "react";

import siteConf from "../../data/config.json";
import NotificationContext from "../../store/notificatons";

import Header from "./Header";
import Notification from "../ui/Notification";

export default function Layout({ children }) {
  const { notification } = useContext(NotificationContext);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="main">{children}</main>
      <footer className="footer">
        <span className="text-gray-500">© {siteConf.name}</span>
      </footer>

      {notification && (
        <Notification
          message={notification.message}
          status={notification.status}
        />
      )}
    </div>
  );
}
