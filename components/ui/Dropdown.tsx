import { useRef } from "react";

import useClickOutside from "../hooks/useClickOutside";
import styles from "./Dropdown.module.css";

type Props = {
  children: JSX.Element;
  className: string;
  position: "bottom" | "right";
  toggleContent: JSX.Element | string;
};

function Dropdown({
  children,
  className = "",
  position = "bottom",
  toggleContent = <>&darr;</>,
}: Props) {
  const dropdownRef = useRef<HTMLElement>(null);
  const [isActive, setIsActive] = useClickOutside(dropdownRef, false);

  const classNames = className ? className.split(" ") : [];
  const menuPosition = {
    bottom: { right: "0", top: "calc(100% + 0.5rem)" },
    right: { left: "calc(100% + 0.5rem)", top: 0 },
  };

  function handleClick() {
    setIsActive(!isActive);
  }

  return (
    <div className={styles.dropdown}>
      <button
        className={[styles.trigger, ...classNames].join(" ")}
        onClick={handleClick}
      >
        {toggleContent}
      </button>

      <nav
        className={`${styles.menu}${isActive ? ` ${styles.active}` : ""}`}
        ref={dropdownRef}
        style={menuPosition[position]}
      >
        {children}
      </nav>
    </div>
  );
}

export default Dropdown;
