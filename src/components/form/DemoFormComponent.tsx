import React, { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import HelpDrawer from "../help/HelpDrawerComponent";
import { FieldWithHelp } from "./FieldWithHelpComponent";

type HelpPayload = {
  title: string;
  body: ReactNode;
  fieldKey?: string;
};

export const DemoForm: React.FC = () => {
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [helpPayload, setHelpPayload] = useState<HelpPayload | null>(null);
  const lastOpenerRef = useRef<HTMLElement | null>(null);

  const helpContentByField = useMemo(() => ({
    fullName: {
      title: "How to enter your full name",
      body: (
        <div>
          <p>Enter your legal full name as it appears on your government ID.</p>
          <ul>
            <li>Include middle name if available.</li>
            <li>Avoid nicknames.</li>
          </ul>
        </div>
      ),
    },
    email: {
      title: "About the email field",
      body: (
        <div>
          <p>Use an email you check regularly. We'll send updates and confirmations here.</p>
          <p>Example: name@example.gov</p>
        </div>
      ),
    },
    ssnLast4: {
      title: "SSN (last 4) guidance",
      body: (
        <div>
          <p>Enter only the last 4 digits of your Social Security Number.</p>
          <p>We use this to help match your information securely.</p>
        </div>
      ),
    },
  }) as const, []);

  const openHelpForField = useCallback(
    ({ fieldKey, openerEl }: { fieldKey: string; openerEl: HTMLElement | null }) => {
      lastOpenerRef.current = openerEl ?? (document.activeElement as HTMLElement | null);

      const help = (helpContentByField as any)[fieldKey];
      if (!help) {
        setHelpPayload({
          title: "Help",
          body: <p>No help content configured for: <code>{fieldKey}</code></p>,
          fieldKey,
        });
      } else {
        setHelpPayload({ title: help.title, body: help.body, fieldKey });
      }

      setIsHelpOpen(true);
    },
    [helpContentByField]
  );

  const closeHelp = useCallback(() => {
    setIsHelpOpen(false);
    const opener = lastOpenerRef.current;
    if (opener && typeof opener.focus === "function") {
      setTimeout(() => opener.focus(), 0);
    }
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isHelpOpen) closeHelp();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isHelpOpen, closeHelp]);

  return (
    <>
      <h2>AWS Bedrock RAG Help Chat Demo</h2>

      <form onSubmit={(e) => e.preventDefault()} style={{ maxWidth: 760 }}>
        <FieldWithHelp label="Full name" name="fullName" onHelp={openHelpForField}>
          <input id="fullName" name="fullName" type="text" placeholder="First Middle Last" />
        </FieldWithHelp>

        <FieldWithHelp label="Email address" name="email" onHelp={openHelpForField}>
          <input id="email" name="email" type="email" placeholder="you@example.gov" />
        </FieldWithHelp>

        <FieldWithHelp label="SSN (last 4)" name="ssnLast4" onHelp={openHelpForField}>
          <input id="ssnLast4" name="ssnLast4" maxLength={4} placeholder="1234" />
        </FieldWithHelp>

        <div style={{ marginTop: 24 }}>
          <button type="submit">Submit</button>
        </div>
      </form>

      <HelpDrawer open={isHelpOpen} onClose={closeHelp} title={helpPayload?.title ?? "Help"}>
        {helpPayload?.body}
      </HelpDrawer>
    </>
  );
};