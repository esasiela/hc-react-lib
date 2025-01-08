import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/hc-auth-context';
import { getConfig, SCOPE } from '../utils/hc-config';

const withHcAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  requiredScope: string | undefined
) => {
  const config = getConfig();

  return (properties: P) => {
    const { isAuthenticated, hasScope, isAuthLoading } = useAuth();
    const navigate = useNavigate();
    const [accessGranted, setAccessGranted] = useState(false);

    useEffect(() => {
      if (isAuthLoading) {
        console.log(
          'withHcAuth.useEffect - auth is loading, not rendering anything yet'
        );
        return;
      }

      if (requiredScope === SCOPE.PUBLIC) {
        console.log('access allowed - requiredScope is PUBLIC');
        setAccessGranted(true);
      } else if (requiredScope === SCOPE.LOGGED_IN && isAuthenticated()) {
        console.log(
          'access allowed - requiredScope is LOGGED_IN and user is authenticated'
        );
        setAccessGranted(true);
      } else if (hasScope(requiredScope)) {
        console.log(`access allowed - auth user hasScope(${requiredScope})`);
        setAccessGranted(true);
      } else {
        console.log(
          `access denied - navigating to ${config.LOGIN.LOGIN_PATH} with a message`
        );
        setAccessGranted(false);
        navigate(config.LOGIN.LOGIN_PATH, {
          state: { from: 'Access Denied' },
        });
      }
    }, [isAuthenticated, hasScope, navigate, isAuthLoading]);

    if (isAuthLoading || !accessGranted) {
      return;
    }

    return (
      // Render the wrapped component only if access is allowed
      <WrappedComponent {...properties} />
    );
  };
};

export default withHcAuth;
