import { useContext } from "react";

import siteConf from "../../data/config.json";
import NotificationContext from "../../store/notificatons";

import Header from "./Header";
import MobileNav from "./MobileNav";
import Notification from "../ui/Notification";

const navLinks = [
  { name: "blogName", pathname: "/junkyard" },
  { name: "projectsName", pathname: "/projects" },
  { name: "aboutName", pathname: "/about" },
];

export default function Layout({ children }) {
  const { notification } = useContext(NotificationContext);

  return (
    <div className="min-h-screen">
      <Header links={navLinks} />
      <MobileNav links={navLinks} />

      <main className="main">{children}</main>
      <footer className="footer">
        <span className="text-gray-500 text-sm">© {siteConf.name}</span>
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
