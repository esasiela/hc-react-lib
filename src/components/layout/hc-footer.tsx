import React from 'react';
import { getConfig } from '../../utils/hc-config';
import HcDeveloperPane from './hc-developer-pane';
import FunnyNav from './funny-nav';

const HcFooter: React.FC = () => {
  const config = getConfig();

  return (
    <footer className={'hc-footer'}>
      <div className={'hc-content-box'} style={{ textAlign: 'left' }}>
        <FunnyNav />
      </div>
      <div>
        <a
          className={'hc-footer-link'}
          href={config.NAV.HC_ABOUT_URL}
          target={'_blank'}
          rel={'noopener noreferrer'}
        >
          About
        </a>
        <span style={{ margin: '0 10px' }}>|</span>
        <a
          className={'hc-footer-link'}
          href={config.NAV.HC_CONTACT_URL}
          target={'_blank'}
          rel={'noopener noreferrer'}
        >
          Contact
        </a>
      </div>
      <div style={{ marginTop: '15px' }}>
        All rights reserved by{' '}
        <a
          className={'hc-footer-link'}
          href={config.NAV.HC_HOME_URL}
          target={'_blank'}
          rel={'noopener noreferrer'}
        >
          Hedge Court
        </a>
      </div>
      <HcDeveloperPane />
    </footer>
  );
};
export default HcFooter;
