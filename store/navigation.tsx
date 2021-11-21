import { createContext, useState } from "react";

type ContextType = {
  isOpen: boolean;
  toggleMobileNav: () => void;
};

const NavigationContext = createContext<ContextType>({
  isOpen: false,
  toggleMobileNav: function () {},
});

export default NavigationContext;

export function NavigationProvider({ children }: { children: JSX.Element }) {
  const [isOpen, setMobileNav] = useState(false);

  function toggleMobileNav() {
    setMobileNav((isOpen) => !isOpen);
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
