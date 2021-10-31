import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/client";

import I18nContext from "../../store/i18n";
import siteConf from "../../data/config.json";
import NavigationContext from "../../store/navigation";

import MenuIcon from "../icons/MenuIcon";

export default function Header({ links = [] }) {
  const [isTop, setIsTop] = useState(true);

  const { t } = useContext(I18nContext);
  const { toggleMobileNav } = useContext(NavigationContext);

  const router = useRouter();

  const [session, loading] = useSession();

  function changeLanguage(e) {
    const locale = e.target.value + router.asPath;
    router.replace("/", "/", { locale });
  }

  function handleOnScroll() {
    const top = document.documentElement.scrollTop < 32;

    setIsTop(top);
  }

  function handleLogout(e) {
    e.preventDefault();
    signOut();
  }

  function renderNav() {
    return (
      <ul className="hidden sm:flex gap-1">
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
              <a className="nav-link" href="#" onClick={handleLogout}>
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
      className={`header${
        !isTop
          ? " border-white md:border-gray-200 shadow md:shadow-sm"
          : " border-white"
      }`}
    >
      <div className="header-content">
        <div className="p-2 pl-5 text-3xl">
          <Link href="/">{siteConf.shortName}</Link>
        </div>
        <nav className="px-2 pr-3 sm:pr-5 flex items-center">
          {/** Another simple way 
          <Link href="/" locale={router.locale === "en" ? "fi" : "en"}>
            <button className="text-indigo-500 mr-6">
              {router.locale.toUpperCase()}
            </button>
          </Link> 
          */}
          <select
            className="lang-select"
            defaultValue={router.locale}
            onChange={changeLanguage}
          >
            {router.locales.map((l) => (
              <option key={l} value={l}>
                {l.toUpperCase()}
              </option>
            ))}
          </select>
          <button
            className="block sm:hidden rounded-full p-1 hover:bg-gray-100"
            onClick={toggleMobileNav}
          >
            <MenuIcon />
          </button>
          {!!links.length && renderNav()}
        </nav>
      </div>
    </header>
  );
}
