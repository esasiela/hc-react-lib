export const CONTEXT_ROOT: string = process.env.REACT_APP_CONTEXT_ROOT || '/';

export const SITE_TITLE: string =
  process.env.REACT_APP_SITE_TITLE || 'Site Title';

export const SITE_CONFIG = {
  LOGO_IMAGE: process.env.REACT_APP_LOGO_IMAGE || '',
};

const __HC_HOME_URL__ =
  process.env.REACT_APP_HC_HOME_URL || 'https://www.hedgecourt.com';

export const NAV_CONFIG = {
  HC_HOME_URL: __HC_HOME_URL__,
  HC_PORTFOLIO_URL: `${__HC_HOME_URL__}/portfolio`,
  HC_ROBOTS_URL: `${__HC_HOME_URL__}/robots`,
  HC_ART_URL: `${__HC_HOME_URL__}/artist`,
  HC_ABOUT_URL: `${__HC_HOME_URL__}/about`,
  HC_CONTACT_URL: `${__HC_HOME_URL__}/contact`,
};

export const LOGIN_CONFIG = {
  LOGIN_API_URL:
    process.env.REACT_APP_HC_AUTH_API_URL || 'http://localhost:8081',
  LOGIN_PATH: '/login',
  POST_LOGIN_PATH: '/',
  POST_LOGOUT_PATH: '/',
  DEFAULT_ENABLE: process.env.REACT_APP_LOGIN_DEFAULT_ENABLE || false,
  DEFAULT_USER: process.env.REACT_APP_LOGIN_DEFAULT_USER || '',
  DEFAULT_PASS: process.env.REACT_APP_LOGIN_DEFAULT_PASS || '',
};

export const SCOPE = {
  PUBLIC: undefined,
  LOGGED_IN: '',
  USER_READ: 'user:read',
  USER_WRITE: 'user:write',
  DEVELOPER: 'developer',
};
