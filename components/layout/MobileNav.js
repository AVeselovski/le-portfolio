import { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import I18nContext from "../../store/i18n";
import NavigationContext from "../../store/navigation";
import CloseIcon from "../icons/CloseIcon";

export default function MobileNav({ links = [] }) {
  const { isOpen, toggleMobileNav } = useContext(NavigationContext);
  const { t } = useContext(I18nContext);

  const router = useRouter();

  function renderNav() {
    return (
      <ul>
        {links.map((l, i) => (
          <li key={i}>
            <Link href={l.pathname}>
              <a
                className={`nav-link${
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
      </ul>
    );
  }

  return (
    <>
      <div className={`mobile-nav${isOpen ? " open" : ""}`}>
        <div className="mobile-nav-header">
          <button
            className="rounded-full p-1 hover:bg-gray-100"
            onClick={toggleMobileNav}
            tabIndex={isOpen ? 0 : -1}
          >
            <CloseIcon />
          </button>
        </div>
        <div className="mobile-nav-body">{!!links.length && renderNav()}</div>
      </div>
      <div
        className={`backdrop${isOpen ? " open" : ""}`}
        onClick={toggleMobileNav}
      ></div>
    </>
  );
}
