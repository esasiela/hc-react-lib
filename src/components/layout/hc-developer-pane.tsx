import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/16/solid';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../../context/hc-auth-context';
import HcDeveloperToastPane from './hc-developer-toast-pane';
import { SCOPE } from '../../utils/hc-config';
import HcDeveloperBuildInfoPane from './hc-developer-build-info-pane';
import HcDeveloperConfigPane from './hc-developer-config-pane';
import HcYeaNayString from '../hc-yea-nay-string';

interface JwtPayload {
  jti: string;
  iat: number;
  exp: number;
  'hc/env': string;
  sub: string;
  authorities: string[];
}

const HcDeveloperPane: React.FC = () => {
  const { isAuthenticated, authUser, hasScope } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const storedState = localStorage.getItem('isDevPaneCollapsed');
    return storedState ? JSON.parse(storedState) : false;
  });

  useEffect(() => {
    if (!hasScope(SCOPE.DEVELOPER_READ)) {
      // clear out any local storage in case user formerly was a dev
      localStorage.removeItem('isDevPaneCollapsed');
      return;
    }

    localStorage.setItem('isDevPaneCollapsed', JSON.stringify(isCollapsed));
  }, [hasScope, isCollapsed]);

  if (!hasScope(SCOPE.DEVELOPER_READ)) {
    // do not process or render for unauthorized users
    return;
  }

  const jwt = localStorage.getItem('jwt'); // Retrieve JWT from local storage

  // Function to decode and pretty-print the JWT payload
  const decodeJwt = (token: string): JwtPayload => {
    const base64Url = token.split('.')[1]; // Get the payload part of the JWT (middle part)
    const base64 = base64Url.replaceAll('-', '+').replaceAll('_', '/'); // Decode Base64Url to Base64
    const jsonPayload = atob(base64); // Decode Base64 to JSON string
    return JSON.parse(jsonPayload); // Parse the JSON string
  };

  const testScopes: (string | undefined)[] = [
    SCOPE.USER_READ,
    SCOPE.USER_WRITE,
    SCOPE.DEVELOPER_READ,
    'admin',
    'superadmin',
  ];

  return (
    <div className={'hc-content-box'}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span
          onClick={() => setIsCollapsed(!isCollapsed)}
          style={{ display: 'inline-flex', verticalAlign: 'middle' }}
        >
          {isCollapsed ? (
            <ChevronRightIcon style={{ width: '24px', height: '24px' }} />
          ) : (
            <ChevronDownIcon style={{ width: '24px', height: '24px' }} />
          )}
        </span>

        <h3>Developer Pane</h3>
      </div>
      {!isCollapsed && (
        <div className={'hc-dev-pane-content'}>
          {/* Left Column */}
          <div className={'hc-dev-pane-content-left'}>
            <div>
              {jwt ? (
                <pre>{JSON.stringify(decodeJwt(jwt), undefined, 2)}</pre> // Pretty print decoded JWT payload
              ) : (
                <p>No JWT in local storage</p> // Display message if no JWT found
              )}
            </div>
            <hr />
            <div>
              <b>isAuthenticated:</b>{' '}
              <HcYeaNayString status={isAuthenticated()} />
            </div>

            <div>
              <table
                style={{
                  width: 'auto',
                  borderCollapse: 'collapse',
                  marginTop: '20px',
                }}
              >
                <thead>
                  <tr>
                    <th
                      style={{
                        textAlign: 'left',
                        borderBottom: '2px solid #ddd',
                        padding: '8px',
                      }}
                    >
                      Scope
                    </th>
                    <th
                      style={{
                        textAlign: 'left',
                        borderBottom: '2px solid #ddd',
                        padding: '8px',
                      }}
                    >
                      hasScope()
                    </th>
                    <th
                      style={{
                        textAlign: 'left',
                        borderBottom: '2px solid #ddd',
                        padding: '8px',
                      }}
                    >
                      authUser.hasScope()
                    </th>
                    <th
                      style={{
                        textAlign: 'left',
                        borderBottom: '2px solid #ddd',
                        padding: '8px',
                      }}
                    >
                      Match?
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {testScopes.map((scope) => {
                    const hasScopeValue = hasScope(scope);
                    const authUserScopeValue = authUser
                      ? hasScope(scope)
                      : undefined;
                    const isMatch =
                      authUser === null
                        ? undefined
                        : hasScopeValue === authUserScopeValue;

                    return (
                      <tr key={scope}>
                        <td
                          style={{
                            padding: '8px',
                            borderBottom: '1px solid #eee',
                          }}
                        >
                          {scope}
                        </td>
                        <td
                          style={{
                            textAlign: 'center',
                            padding: '8px',
                            borderBottom: '1px solid #eee',
                          }}
                        >
                          <HcYeaNayString status={hasScopeValue} />
                        </td>
                        <td
                          style={{
                            textAlign: 'center',
                            padding: '8px',
                            borderBottom: '1px solid #eee',
                          }}
                        >
                          <HcYeaNayString status={authUserScopeValue} />
                        </td>
                        <td
                          style={{
                            textAlign: 'center',
                            padding: '8px',
                            borderBottom: '1px solid #eee',
                            backgroundColor:
                              isMatch === false ? '#ffe6e6' : 'transparent', // Pastel pink for mismatch
                          }}
                        >
                          <HcYeaNayString
                            status={isMatch}
                            nayString={isMatch === undefined ? 'n/a' : 'No'}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <HcDeveloperBuildInfoPane />
          </div>

          {/* Right Column */}
          <div className={'hc-dev-pane-content-right'}>
            <h3>Link-a-delphia</h3>
            <ul>
              <li>
                Public: <Link to={'/my-page'}>My Page</Link>
              </li>
              <li>
                Login Only: <Link to={'/profile'}>User Profile</Link>
              </li>
              <li>
                Requires Scope:{' '}
                <Link to={'/users'}>Users ({SCOPE.USER_READ})</Link>
              </li>
            </ul>
            <HcDeveloperToastPane />
            <HcDeveloperConfigPane />
          </div>
        </div>
      )}
    </div>
  );
};

export default HcDeveloperPane;
