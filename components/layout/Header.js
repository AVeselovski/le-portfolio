import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import I18nContext from "../../store/i18n";
import siteConf from "../../data/config.json";
import NavigationContext from "../../store/navigation";

import MenuIcon from "../icons/MenuIcon";

export default function Header({ links = [] }) {
  const [isTop, setIsTop] = useState(true);

  const { t } = useContext(I18nContext);
  const { toggleMobileNav } = useContext(NavigationContext);

  const router = useRouter();

  function changeLanguage(e) {
    const locale = e.target.value + router.asPath;
    router.replace("/", "/", { locale });
  }

  function onScroll() {
    const top = document.documentElement.scrollTop < 32;

    setIsTop(top);
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
      </ul>
    );
  }

  useEffect(() => {
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`header${
        !isTop ? " border-gray-200 shadow-sm" : " border-white"
      }`}
    >
      <div className="p-2 pl-5 text-3xl">
        <Link href="/">{siteConf.shortName}</Link>
      </div>
      <nav className="p-2 pr-3 sm:pr-5 flex">
        {/** Another simple way 
        <Link href="/" locale={router.locale === "en" ? "fi" : "en"}>
          <button className="text-indigo-500 mr-6">
            {router.locale.toUpperCase()}
          </button>
        </Link> 
        */}
        <select
          className="bg-transparent mr-6 flex text-indigo-500 font-mono"
          defaultValue={router.locale}
          onChange={changeLanguage}
        >
          <option value="en">EN</option>
          <option value="fi">FI</option>
        </select>
        <button
          className="block sm:hidden rounded-full p-1 hover:bg-gray-100"
          onClick={toggleMobileNav}
        >
          <MenuIcon />
        </button>
        {!!links.length && renderNav()}
      </nav>
    </header>
  );
}
