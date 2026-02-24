import React, { type ReactNode } from "react";
import { Button } from "@cmsgov/ds-healthcare-gov";

type Props = {
  open: boolean;
  onClose: () => void;
  width?: number;
  title?: string;
  children: ReactNode;
};

export const RightDrawerShell: React.FC<Props> = ({
  open,
  onClose,
  width = 420,
  title,
  children,
}) => {
  return (
    <section
      role="dialog"
      aria-modal="false"
      aria-label={title ?? "Help"}
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        height: "100vh",
        width,
        background: "#ffffff",

        // blue outline
        borderLeft: "4px solid #1f70c1",
        boxShadow: "-8px 0 18px rgba(0,0,0,0.08)",

        transform: open ? "translateX(0)" : `translateX(${width}px)`,
        transition: "transform 240ms ease",

        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Shell header with guaranteed working close */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          padding: "12px 16px",
          borderBottom: "1px solid rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ fontWeight: 700 }}>{title ?? "Help"}</div>

        <Button type="button" variant="secondary" onClick={onClose} aria-label="Close help drawer">
          Close
        </Button>
      </div>

      <div style={{ padding: 16, overflowY: "auto", flex: 1 }}>
        {children}
      </div>
    </section>
  );
};