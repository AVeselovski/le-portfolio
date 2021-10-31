import { useState, useEffect } from "react";

/**
 * Hook for handling closing when clicking outside of an element.
 * @param el React element
 * @param initialState
 */
function useClickOutside(el, initialState) {
  const [isActive, setIsActive] = useState(initialState);

  useEffect(() => {
    function handleClick(e) {
      if (el.current !== null && !el.current.contains(e.target)) {
        setIsActive(!isActive);
      }
    }

    if (isActive) {
      window.addEventListener("click", handleClick);
    }

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [isActive, el]);

  return [isActive, setIsActive];
}

export default useClickOutside;
