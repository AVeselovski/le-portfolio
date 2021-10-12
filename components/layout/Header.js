import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import siteConf from "../../data/config.json";
import NavigationContext from "../../store/navigation";

import MenuIcon from "../icons/MenuIcon";

export default function Header({ links = [] }) {
  const [isTop, setIsTop] = useState(true);
  const { toggleMobileNav } = useContext(NavigationContext);

  const router = useRouter();

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
                {l.name}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    );
  }

  function onScroll() {
    const top = document.documentElement.scrollTop < 30;

    setIsTop(top);
  }

  useEffect(() => {
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`header${!isTop ? " border-b shadow-sm" : ""}`}>
      <div className="p-2 pl-5 text-3xl">
        <Link href="/">{siteConf.shortName}</Link>
      </div>
      <nav className="p-2 pr-3 sm:pr-5">
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
