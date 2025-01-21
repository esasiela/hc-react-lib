import React, { ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';
import HcHeader from './hc-header';
import HcFooter from './hc-footer';
import { useSite } from '../../context/hc-site-context';
import { Link } from 'react-router-dom';

interface HcLayoutProperties {
  pageTitle: string;
  browserTitle?: string;
  isHome?: boolean;
  children?: ReactNode;
}

const HcLayout: React.FC<HcLayoutProperties> = ({
  pageTitle,
  browserTitle,
  isHome = false,
  children,
}) => {
  const { siteTitle } = useSite();

  return (
    <div>
      <Helmet>
        <title>
          HC {siteTitle} - {browserTitle || pageTitle}
        </title>
      </Helmet>
      <HcHeader />
      <div className={'hc-content-box'}>
        <div className={'hc-page-title-container'}>
          <h1>{pageTitle}</h1>
          {!isHome && (
            <span className={'hc-page-title-breadcrumbs'}>
              Return <Link to={'/'}>Home</Link>
            </span>
          )}
        </div>
        {children}
      </div>
      <HcFooter />
    </div>
  );
};
export default HcLayout;
