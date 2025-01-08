import React, { createContext, ReactNode, useContext } from 'react';
import defaultLogo from '../assets/images/hc-logo-2020-web-home.png';

interface HcSiteContextValue {
  siteTitle: string;
  logoImage: string;
}

interface HcSiteProviderProperties {
  siteTitle: string;
  logoImage?: string;
  children: ReactNode;
}

const HcSiteContext = createContext<HcSiteContextValue | undefined>(undefined);

export const useSite = () => {
  const context = useContext(HcSiteContext);
  if (!context) {
    throw new Error('useSite must be used within an HcSiteProvider');
  }
  return context;
};

export const HcSiteProvider: React.FC<HcSiteProviderProperties> = ({
  siteTitle,
  logoImage,
  children,
}) => {
  const finalLogoImage = logoImage || defaultLogo;
  console.log('HcSiteProvider - logoImage', logoImage);

  return (
    <HcSiteContext.Provider
      value={{ logoImage: finalLogoImage, siteTitle: siteTitle }}
    >
      {children}
    </HcSiteContext.Provider>
  );
};
