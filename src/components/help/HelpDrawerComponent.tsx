/* @flow */
import { Button } from '@cmsgov/ds-healthcare-gov';
import * as React from 'react';

export type Props = {
  title: string,
  children: React.ReactNode,
  onCloseClick: () => void,
  viewingFromModal?: boolean,
};

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
export class HelpDrawer extends React.PureComponent<Props> {
  titleRef: HTMLElement | null = null;
  helpDrawerRef: HTMLElement | null = null;

  componentDidMount() {
    if (this.titleRef) this.titleRef.focus();
  }

  render() {
    const { title, children, onCloseClick, viewingFromModal } = this.props;
    const modalClass = viewingFromModal ? 'app3-c-help-drawer-modal' : '';
    return (
      <div className={`app3-c-help-drawer ${modalClass}`} ref={el => { this.helpDrawerRef = el; }}>
        <div className="ds-c-drawer__header">
          <h3 ref={el => { this.titleRef = el; }} tabIndex={0} className="ds-c-drawer__header-heading">
            {title}
          </h3>
          <Button className="ds-c-drawer__close-button" size="small" onClick={onCloseClick}>
            Close
          </Button>
        </div>
        <div className="ds-c-drawer__body">
          {children}
        </div>
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
