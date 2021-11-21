import React, { useState, useEffect } from "react";

/**
 * Hook for handling closing when clicking outside of an element.
 * @param el React element
 * @param initialState
 */
function useClickOutside(
  el: React.RefObject<HTMLElement>,
  initialState: boolean = false
) {
  const [isActive, setIsActive] = useState<boolean>(initialState);

  useEffect(() => {
    function handleClick(e: Event) {
      if (el.current !== null && !el.current.contains(e.target as Element)) {
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

  return [isActive, setIsActive] as const;
}

export default useClickOutside;
