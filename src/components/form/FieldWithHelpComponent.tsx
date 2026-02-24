import React, { useRef, type ReactNode } from "react";
import { Button } from "@cmsgov/ds-healthcare-gov";

type Props = {
  label: string;
  name: string;
  children: ReactNode;

  // New: let DemoForm decide what to show in the drawer
  onHelp: (args: {
    fieldKey: string;
    openerEl: HTMLElement | null;
  }) => void;
};

export const FieldWithHelp: React.FC<Props> = ({ label, name, children, onHelp }) => {
  const openerRef = useRef<HTMLButtonElement | null>(null);

  return (
    <div style={{ marginBottom: 16 }}>
      <label htmlFor={name} style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>
        {label}
      </label>

      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <div style={{ flex: 1 }}>{children}</div>

        <Button
          ref={openerRef}
          variant="secondary"
          aria-label={`Open help for ${label}`}
          onClick={() => onHelp({ fieldKey: name, openerEl: openerRef.current })}
        >
          Help
        </Button>
      </div>
    </div>
  );
};