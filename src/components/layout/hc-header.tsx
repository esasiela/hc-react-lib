// src/components/hc-header.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useSite } from '../../context/hc-site-context';

import HcUserProfileDropdown from './hc-user-profile-dropdown';
import { getConfig } from '../../utils/hc-config';

const HcHeader = () => {
  const { logoImage } = useSite();
  const config = getConfig();

  return (
    <header className={'hc-header'}>
      <Link to={config.NAV.HC_HOME_URL}>
        <img
          src={logoImage}
          alt={'HedgeCourt Site Logo'}
          className={'hc-logo'}
        />
      </Link>
      <nav className={'hc-header-nav'}>
        <a
          className={'hc-header-nav-item'}
          href={config.NAV.HC_HOME_URL}
          target={'_blank'}
          rel={'noopener noreferrer'}
        >
          Home
        </a>

        <a
          className={'hc-header-nav-item'}
          href={config.NAV.HC_PORTFOLIO_URL}
          target={'_blank'}
          rel={'noopener noreferrer'}
        >
          Portfolio
        </a>

        <a
          className={'hc-header-nav-item'}
          href={config.NAV.HC_ROBOTS_URL}
          target={'_blank'}
          rel={'noopener noreferrer'}
        >
          Robots
        </a>

        <a
          className={'hc-header-nav-item'}
          href={config.NAV.HC_ART_URL}
          target={'_blank'}
          rel={'noopener noreferrer'}
        >
          Art
        </a>

        <Link to={'/'} className={'hc-header-nav-item'}>
          Apps
        </Link>

        <HcUserProfileDropdown className={'hc-header-nav-item'} />
      </nav>
    </header>
  );
};

export default HcHeader;
