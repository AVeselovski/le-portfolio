import { createContext, useState } from "react";

const NavigationContext = createContext({
  isOpen: false,
  toggleMobileNav: function () {},
});

export default NavigationContext;

export function NavigationProvider({ children }) {
  const [isOpen, setMobileNav] = useState(false);

  function toggleMobileNav() {
    setMobileNav(!isOpen);
  }

  const context = {
    isOpen,
    toggleMobileNav,
  };

  return (
    <NavigationContext.Provider value={context}>
      {children}
    </NavigationContext.Provider>
  );
}
