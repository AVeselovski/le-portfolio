import { useRef } from "react";

import useClickOutside from "../hooks/useClickOutside";
import styles from "./Dropdown.module.css";

function Dropdown({
  children,
  className = "",
  position = "bottom",
  toggleContent = <>&darr;</>,
}) {
  const dropdownRef = useRef();
  const [isActive, setIsActive] = useClickOutside(dropdownRef, false);

  const classNames = className ? className.split(" ") : [];
  const ddMenuPosition = {
    bottom: { right: "0", top: "calc(100% + 0.5rem)" },
    right: { left: "calc(100% + 0.5rem)", top: 0 },
  };

  function handleClick() {
    setIsActive(!isActive);
  }

  return (
    <div className={styles.ddContainer}>
      <button
        className={[styles.ddTrigger, ...classNames].join(" ")}
        onClick={handleClick}
      >
        {toggleContent}
      </button>

      <nav
        className={`${styles.ddMenu}${isActive ? ` ${styles.active}` : ""}`}
        ref={dropdownRef}
        style={ddMenuPosition[position]}
      >
        {children}
      </nav>
    </div>
  );
}

export default Dropdown;
