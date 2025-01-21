import React from 'react';
import { Route } from 'react-router-dom';
import HcBaseApp from '../hc-base-app';
import HomePage from './home-page';
import TestPage from './test-page';
import LoginPage from './login-page';
import LogoutPage from './logout-page';
import BuildInfoPage from './build-info-page';
import UserProfilePage from './user-profile-page';
import logoImage from '../assets/images/hc-logo-2020-web-apps.png';
import NavInfoPage from './nav-info-page';

const HcHomeApp: React.FC = () => {
  // TODO include a "path='*'" catch-all for elegant RouteNotFound
  return (
    <HcBaseApp siteTitle={'Apps'} logoImage={logoImage}>
      <Route path={'/'} element={<HomePage />} />
      <Route path={'/test'} element={<TestPage />} />
      <Route path={'/build-info'} element={<BuildInfoPage />} />
      <Route path={'/nav-info'} element={<NavInfoPage />} />
      <Route path={'/user-profile'} element={<UserProfilePage />} />
      <Route path={'/login'} element={<LoginPage />} />
      <Route path={'/logout'} element={<LogoutPage />} />
    </HcBaseApp>
  );
};
export default HcHomeApp;
