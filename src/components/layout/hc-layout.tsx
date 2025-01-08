import React, { ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';
import HcHeader from './hc-header';
import HcFooter from './hc-footer';
import { useSite } from '../../context/hc-site-context';

interface HcLayoutProperties {
  pageTitle: string;
  browserTitle?: string;
  children?: ReactNode;
}

const HcLayout: React.FC<HcLayoutProperties> = ({
  pageTitle,
  browserTitle,
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
        <h1>{pageTitle}</h1>
        {children}
      </div>
      <HcFooter />
    </div>
  );
};
export default HcLayout;
