import { createContext, useContext, useState, useCallback } from "react";
import type { ReactNode } from "react";

interface GravityContextValue {
  readonly gravity: boolean;
  readonly toggleGravity: () => void;
  readonly footerHeight: number;
  readonly setFooterHeight: (h: number) => void;
}

const GravityContext = createContext<GravityContextValue>({
  gravity: false,
  toggleGravity: () => {},
  footerHeight: 0,
  setFooterHeight: () => {},
});

export function GravityProvider({ children }: { readonly children: ReactNode }) {
  const [gravity, setGravity] = useState(false);
  const [footerHeight, setFooterHeight] = useState(0);
  const toggleGravity = useCallback(() => setGravity((g) => !g), []);

  return (
    <GravityContext.Provider value={{ gravity, toggleGravity, footerHeight, setFooterHeight }}>
      {children}
    </GravityContext.Provider>
  );
}

export function useGravity() {
  return useContext(GravityContext);
}
