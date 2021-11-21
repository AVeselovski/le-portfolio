import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/client";

import I18nContext from "../../store/i18n";
import siteConf from "../../data/config.json";
import NavigationContext from "../../store/navigation";
import styles from "./Header.module.css";

import MenuIcon from "../icons/MenuIcon";

interface ILink {
  name: string;
  pathname: string;
}

type Props = {
  links: ILink[];
};

export default function Header({ links = [] }: Props) {
  const [isTop, setIsTop] = useState(true);

  const { t } = useContext(I18nContext);
  const { toggleMobileNav } = useContext(NavigationContext);

  const router = useRouter();

  const [session, loading] = useSession();

  function changeLanguage(e: React.ChangeEvent<HTMLSelectElement>) {
    const locale = e.target.value + router.asPath;
    router.replace("/", "/", { locale });
  }

  function handleOnScroll() {
    const top = document.documentElement.scrollTop < 32;
    setIsTop(top);
  }

  function handleLogout(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    signOut();
  }

  function renderNav() {
    return (
      <ul className={styles.navList}>
        {links.map((l, i) => (
          <li key={i}>
            <Link href={l.pathname}>
              <a
                className={`nav-link${
                  router.pathname == l.pathname ? " active" : ""
                }`}
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
                  className={`nav-link${
                    router.pathname == "/admin" ? " active" : ""
                  }`}
                >
                  {t.adminName}
                </a>
              </Link>
            </li>
            <li key="logout">
              <a
                className="nav-link text-red-500"
                href="#"
                onClick={handleLogout}
              >
                Logout
              </a>
            </li>
          </>
        )}
      </ul>
    );
  }

  useEffect(() => {
    window.addEventListener("scroll", handleOnScroll);

    return () => window.removeEventListener("scroll", handleOnScroll);
  }, []);

  return (
    <header
      className={`${styles.header}${!isTop ? ` ${styles.scrolled}` : ""}`}
    >
      <div className={styles.headerContent}>
        <div className={styles.brand}>
          <Link href="/">{siteConf.shortName}</Link>
        </div>
        <nav className={styles.nav}>
          {/** Another simple way 
          <Link href="/" locale={router.locale === "en" ? "fi" : "en"}>
            <button className="text-indigo-500 mr-6">
              {router.locale.toUpperCase()}
            </button>
          </Link> */}
          <select
            className={styles.langSelect}
            defaultValue={router.locale}
            onChange={changeLanguage}
          >
            {router?.locales?.map((l) => (
              <option key={l} value={l}>
                {l.toUpperCase()}
              </option>
            ))}
          </select>
          <button className={styles.mobileNavToggle} onClick={toggleMobileNav}>
            <MenuIcon />
          </button>
          {!!links.length && renderNav()}
        </nav>
      </div>
    </header>
  );
}
