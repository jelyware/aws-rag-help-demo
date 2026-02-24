import React, { useEffect, useRef, type ReactNode } from "react";
import { Button } from "@cmsgov/ds-healthcare-gov";

type Props = {
  open: boolean;
  onClose: () => void;
  width?: number;
  title: string;
  children: ReactNode;
};

export const RightDrawerShell: React.FC<Props> = ({
  open,
  onClose,
  width = 520,
  title,
  children,
}) => {
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  // Match HelpDrawer behavior: focus title when opened
  useEffect(() => {
    if (open) {
      // slight delay helps if opening with transition
      window.setTimeout(() => titleRef.current?.focus(), 0);
    }
  }, [open]);

  return (
    <section
      role="dialog"
      aria-modal="false"
      aria-label={title}
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        height: "100vh",
        width,
        background: "#ffffff",

        // no overlay; blue outline
        borderLeft: "3px solid #1f70c1",
        boxShadow: "-8px 0 18px rgba(0,0,0,0.08)",

        transform: open ? "translateX(0)" : `translateX(${width}px)`,
        transition: "transform 240ms ease",
        zIndex: 1000,

        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ✅ Same classes as HelpDrawerComponent so title styling matches */}
      <div className="ds-c-drawer__header">
        <h3
          ref={titleRef}
          tabIndex={0}
          className="ds-c-drawer__header-heading"
          style={{ display: "inline-block", marginLeft: 24, marginRight: 180 }}
        >
          {title}
        </h3>

        <Button
          type="button"
          className="ds-c-drawer__close-button"
          size="small"
          onClick={onClose}
        >
          Close
        </Button>
      </div>

      {/* Content area */}
      <div style={{ marginLeft: 24, flex: 1, overflowY: "auto" }}>
        {children}
      </div>
    </section>
  );
};