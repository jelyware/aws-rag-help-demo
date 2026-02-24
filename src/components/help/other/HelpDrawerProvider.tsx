import React, { useCallback, useState, useRef, type ReactNode } from "react";
import { HelpContext, type HelpPayload } from "./constants/useHelp.constant";

export const HelpDrawerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [current, setCurrent] = useState<HelpPayload | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const lastOpenerRef = useRef<HTMLElement | null>(null);

  const openHelp = useCallback((payload: HelpPayload, opener?: HTMLElement | null) => {
    if (opener) lastOpenerRef.current = opener;
    setCurrent(payload);
    setIsOpen(true);
  }, []);

  const closeHelp = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => setCurrent(null), 250); // allow animated close to finish
    // restore focus to opener if present
    const opener = lastOpenerRef.current;
    if (opener && typeof opener.focus === "function") {
      setTimeout(() => opener.focus(), 0);
    }
  }, []);

  return (
    <HelpContext.Provider value={{ openHelp, closeHelp, current, isOpen, lastOpenerRef }}>
      {children}
    </HelpContext.Provider>
  );
};