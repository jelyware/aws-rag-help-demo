/**
 * A help drawer provides a space for medium to long-form help
 * content — content that's too long or not common enough to warrant
 * being on the page by default.
 *
 * On large screens it's fixed to the side of the screen, and on
 * smaller screens it overlays the entire screen.
 *
 * To use: Render the drawer below the toggle bottom that triggers it.
 * This way the markup remains semantically sound and screen reader friendly.
 */
/* @flow */
import * as React from "react";

export type Props = {
  children: React.ReactNode,
  viewingFromModal?: boolean,
};

/**
 * HelpDrawer content only (header moved to RightDrawerShell).
 */
export class HelpDrawer extends React.PureComponent<Props> {
  helpDrawerRef: HTMLElement | null = null;

  render() {
    const { children, viewingFromModal } = this.props;
    const modalClass = viewingFromModal ? "app3-c-help-drawer-modal" : "";

    return (
      <div
        className={`app3-c-help-drawer ${modalClass}`}
        ref={(el) => {
          this.helpDrawerRef = el;
        }}
      >
        <div className="ds-c-drawer__body">{children}</div>

        <div className="ds-c-drawer__footer">
          <h4 className="ds-c-drawer__footer-title">Still need help?</h4>
          <div className="ds-c-drawer__footer-body">
            <p>Contact your local support team for assistance.</p>
          </div>
        </div>
      </div>
    );
  }
}

export default HelpDrawer;
