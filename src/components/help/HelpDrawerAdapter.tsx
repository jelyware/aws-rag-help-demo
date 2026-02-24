import React, { Suspense, useEffect } from "react";
import { useHelp } from "./constants/useHelp.constant";
import { FocusTrap } from "focus-trap-react";

const LazyHelpDrawer = React.lazy(() =>
  // change path if your existing component file is local
  import("./HelpDrawerComponent").catch(() => ({ default: (props: any) => null }))
);

/**
 * Adapter props are not required — this reads provider state.
 * It renders your existing HelpDrawer component with props {open, onClose, title, children}
 */
export const HelpDrawerAdapter: React.FC = () => {
  const { isOpen, closeHelp, current } = useHelp();

  // close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeHelp();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeHelp]);

  // Note: wrap in dialog semantics, role="dialog", aria-modal, etc.
  return (
    <Suspense fallback={null}>
      {isOpen ? (
        <FocusTrap>
          <div
            role="dialog"
            aria-modal="true"
            aria-label={current?.title ?? "Help"}
            style={{
              position: "fixed",
              right: 0,
              top: 0,
              height: "100vh",
              width: "420px",
              zIndex: 1200,
              background: "white",
              boxShadow: "-8px 0 24px rgba(0,0,0,0.12)",
              overflowY: "auto",
            }}
          >
            {/* If your HelpDrawer is a component, render it; otherwise render basic layout */}
            <LazyHelpDrawer open={isOpen} onClose={closeHelp} title={current?.title || "Help"}>
              {current?.content}
            </LazyHelpDrawer>
          </div>
        </FocusTrap>
      ) : null}
    </Suspense>
  );
};