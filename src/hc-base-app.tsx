import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './assets/styles/hc-react.css';
import { HcSiteProvider } from './context/hc-site-context';
import { HelmetProvider } from 'react-helmet-async';
import { getConfig, loadConfig } from './utils/hc-config';
import { HcAuthProvider } from './context/hc-auth-context';
import { ToastContainer } from 'react-toastify';

interface HcBaseAppProperties {
  siteTitle: string;
  logoImage?: string;
  children: React.ReactNode;
}

const HcBaseApp: React.FC<HcBaseAppProperties> = ({
  logoImage,
  siteTitle,
  children,
}) => {
  const [configLoaded, setConfigLoaded] = useState(false);

  useEffect(() => {
    const initializeConfig = async (): Promise<void> => {
      try {
        await loadConfig();

        setConfigLoaded(true);
      } catch (error) {
        console.error('Error loading configuration:', error);
        // TODO set an error condition that all pages are non-configured
      }
    };
    initializeConfig();
  }, []);

  if (!configLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <HelmetProvider>
      <Router basename={getConfig().CONTEXT_ROOT || '/'}>
        <HcSiteProvider siteTitle={siteTitle} logoImage={logoImage}>
          <HcAuthProvider>
            <ToastContainer
              position={'top-center'}
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={true}
              closeOnClick
              pauseOnHover
              draggable
              theme={'light'}
            />
            <Routes>{children}</Routes>
          </HcAuthProvider>
        </HcSiteProvider>
      </Router>
    </HelmetProvider>
  );
};

export default HcBaseApp;
