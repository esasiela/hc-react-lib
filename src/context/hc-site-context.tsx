import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import defaultLogo from '../assets/images/hc-logo-2020-web-home.png';
import { NavItem } from '../models/nav-item';
import { getConfig } from '../utils/hc-config';
import { useAuth } from './hc-auth-context';

interface SiteContextType {
  siteTitle: string;
  logoImage: string;
  navItems: NavItem[];
  isSiteLoading: boolean;
}

interface HcSiteProviderProperties {
  siteTitle: string;
  logoImage?: string;
  children: ReactNode;
}

const HcSiteContext = createContext<SiteContextType | undefined>(undefined);

export const HcSiteProvider: React.FC<HcSiteProviderProperties> = ({
  siteTitle,
  logoImage,
  children,
}) => {
  const [isSiteLoading, setIsSiteLoading] = useState(true);
  const [navItems, setNavItems] = useState<NavItem[]>([]);
  const { token } = useAuth();
  const config = getConfig();

  // TODO replace LOGIN_API_URL with NAV_API_URL
  const navEndpoint = config.LOGIN.LOGIN_API_URL + '/nav';

  useEffect(() => {
    console.log('hcSiteContext.useEffect()');

    const fetchNav = async () => {
      setIsSiteLoading(true);
      try {
        const response = await fetch(navEndpoint, {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });
        if (!response.ok) {
          // Ouch, how we do nav?
          throw new Error('Failed to fetch nav');
        }
        setNavItems((await response.json()) as NavItem[]);
      } catch (error_) {
        console.log('hcSiteContext.useEffect() error fetching nav', error_);
      }
    };
    fetchNav();

    setIsSiteLoading(false);
  }, [token]);

  const finalLogoImage = logoImage || defaultLogo;
  console.log('HcSiteProvider - logoImage', logoImage);

  return (
    <HcSiteContext.Provider
      value={{
        logoImage: finalLogoImage,
        siteTitle: siteTitle,
        navItems: navItems,
        isSiteLoading: isSiteLoading,
      }}
    >
      {children}
    </HcSiteContext.Provider>
  );
};

export const useSite = () => {
  const context = useContext(HcSiteContext);
  if (!context) {
    throw new Error('useSite must be used within an HcSiteProvider');
  }
  return context;
};

export { HcSiteContext };
