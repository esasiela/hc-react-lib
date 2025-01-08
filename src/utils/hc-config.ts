import { merge, omit } from 'lodash';
import JSON5 from 'json5';

export interface HcConfigType {
  CONTEXT_ROOT: string;
  CONFIG_PATH: string;
  HC: {
    ENVIRONMENT: string;
    NODE: string;
  };
  NAV: {
    HC_HOME_URL: string;
    HC_PORTFOLIO_URL: string;
    HC_ROBOTS_URL: string;
    HC_ART_URL: string;
    HC_ABOUT_URL: string;
    HC_CONTACT_URL: string;
  };
  LOGIN: {
    LOGIN_API_URL: string;
    LOGIN_PATH: string;
    POST_LOGIN_PATH: string;
    POST_LOGOUT_PATH: string;
    DEFAULT_ENABLE: boolean | string;
    DEFAULT_USER: string;
    DEFAULT_PASS: string;
  };
}

let config: HcConfigType = {
  //CONTEXT_ROOT: process.env.REACT_APP_CONTEXT_ROOT || '/',
  CONTEXT_ROOT: '/', // this gets overwritten by window.HC_CONTEXT_ROOT during loadConfig()
  CONFIG_PATH: '/hc-config.json5',
  HC: {
    ENVIRONMENT: 'default',
    NODE: 'default',
  },
  NAV: {
    HC_HOME_URL: 'https://www.hedgecourt.com',
    HC_PORTFOLIO_URL: 'https://www.hedgecourt.com/portfolio',
    HC_ROBOTS_URL: 'https://www.hedgecourt.com/robots',
    HC_ART_URL: 'https://www.hedgecourt.com/artist',
    HC_ABOUT_URL: 'https://www.hedgecourt.com/about',
    HC_CONTACT_URL: 'https://www.hedgecourt.com/contact',
  },
  LOGIN: {
    LOGIN_API_URL: 'http://localhost:8081',
    LOGIN_PATH: '/login',
    POST_LOGIN_PATH: '/',
    POST_LOGOUT_PATH: '/',
    DEFAULT_ENABLE: process.env.REACT_APP_LOGIN_DEFAULT_ENABLE === 'true',
    DEFAULT_USER: process.env.REACT_APP_LOGIN_DEFAULT_USER || '',
    DEFAULT_PASS: process.env.REACT_APP_LOGIN_DEFAULT_PASS || '',
  },
};

export const loadConfig = async (): Promise<void> => {
  try {
    // @ts-expect-error set the variable in a script in index.html and P.F.S.
    const rawContextRoot = globalThis.HC_CONTEXT_ROOT;
    const hcContextRoot: string = (rawContextRoot || '/').replace(/\/$/, '');
    const configUrl = hcContextRoot + config.CONFIG_PATH;
    console.log(
      `loadConfig() fetching url=[${configUrl}] (raw=[${rawContextRoot}] hc=[${hcContextRoot}])`
    );

    const response = await fetch(configUrl);
    if (response.ok) {
      console.log('loadConfig() got response');

      // TODO remove any unpopulated keys with %FOO_BAR% values to allow an env just use the default
      const runtimeConfig = configUrl.endsWith('json5')
        ? JSON5.parse(await response.text())
        : await response.json();
      console.log('loadConfig() downloaded config:', runtimeConfig);

      if (runtimeConfig.ENABLED === 'true') {
        console.log('loadConfig() runtimeConfig is enabled, merging');
        config = merge({}, config, omit(runtimeConfig, 'ENABLED'));
      } else {
        console.log('loadConfig() runtimeConfig is not enabled, skipping');
      }

      // ensure CONTEXT_ROOT gets the value from HC_CONTEXT_ROOT
      config.CONTEXT_ROOT = hcContextRoot;
    } else {
      console.error(
        'loadConfig() failed to fetch configuration, status:',
        response.status
      );
    }
  } catch (error) {
    console.error('Error loading configuration:', error);
  }
};

export const getConfig = (): HcConfigType => config;

export const SCOPE = {
  PUBLIC: undefined,
  LOGGED_IN: '',
  USER_READ: 'user:read',
  USER_WRITE: 'user:write',
  DEVELOPER: 'developer',
};
