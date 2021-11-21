import { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/client";

import I18nContext from "../../store/i18n";
import NavigationContext from "../../store/navigation";
import styles from "./MobileNav.module.css";

import CloseIcon from "../icons/CloseIcon";

interface ILink {
  name: string;
  pathname: string;
}

type Props = {
  links: ILink[];
};

export default function MobileNav({ links = [] }: Props) {
  const { isOpen, toggleMobileNav } = useContext(NavigationContext);
  const { t } = useContext(I18nContext);

  const router = useRouter();

  const [session, loading] = useSession();

  function handleLogout(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    signOut();
  }

  function renderNav() {
    return (
      <ul>
        {links.map((l, i) => (
          <li key={i}>
            <Link href={l.pathname}>
              <a
                className={`nav-link ${styles.navLink}${
                  router.pathname == l.pathname ? " active" : ""
                }`}
                onClick={toggleMobileNav.bind(null)}
                tabIndex={isOpen ? 0 : -1}
              >
                {t[l.name]}
              </a>
            </Link>
          </li>
        ))}
        {session && !loading && (
          <>
            <li key="admin">
              <Link href="/admin">
                <a
                  className={`nav-link ${styles.navLink}${
                    router.pathname == "/admin" ? " active" : ""
                  }`}
                  onClick={toggleMobileNav.bind(null)}
                  tabIndex={isOpen ? 0 : -1}
                >
                  {t.adminName}
                </a>
              </Link>
            </li>
            <li key="logout">
              <a
                className={`nav-link ${styles.navLink} text-red-500`}
                href="#"
                onClick={handleLogout}
                tabIndex={isOpen ? 0 : -1}
              >
                Logout
              </a>
            </li>
          </>
        )}
      </ul>
    );
  }

  return (
    <>
      <div className={`${styles.mobileNav}${isOpen ? ` ${styles.open}` : ""}`}>
        <div className={styles.mobileNavHeader}>
          <button
            className={styles.mobileNavToggle}
            onClick={toggleMobileNav}
            tabIndex={isOpen ? 0 : -1}
          >
            <CloseIcon />
          </button>
        </div>
        <div className={styles.mobileNavBody}>
          {!!links.length && renderNav()}
        </div>
      </div>
      <div
        className={`${styles.backdrop}${isOpen ? ` ${styles.open}` : ""}`}
        onClick={toggleMobileNav}
      ></div>
    </>
  );
}
