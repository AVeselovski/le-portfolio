import { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import NavigationContext from "../../store/navigation";
import CloseIcon from "../icons/CloseIcon";

export default function MobileNav({ links = [] }) {
  const { isOpen, toggleMobileNav } = useContext(NavigationContext);

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
              >
                {l.name}
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
