import { createContext, useContext, type ReactNode } from "react";

export type HelpPayload = {
  title?: string;
  content?: ReactNode;
  fieldKey?: string;
};

export type HelpContextValue = {
  openHelp: (payload: HelpPayload, opener?: HTMLElement | null) => void;
  closeHelp: () => void;
  current: HelpPayload | null;
  isOpen: boolean;
  lastOpenerRef: React.MutableRefObject<HTMLElement | null>;
};

export const HelpContext = createContext<HelpContextValue | undefined>(undefined);

export const useHelp = (): HelpContextValue => {
  const ctx = useContext(HelpContext);
  if (!ctx) throw new Error("useHelp must be used within HelpDrawerProvider");
  return ctx;
};