import React from 'react';
import withHcAuth from '../hoc/with-hc-auth';
import { SCOPE } from '../utils/hc-config';
import HcLayout from '../components/layout/hc-layout';
import { useSite } from '../context/hc-site-context';
import { useAuth } from '../context/hc-auth-context';

const NavInfoPage = () => {
  const { navItems } = useSite();
  const { isAuthenticated } = useAuth();
  const authStatus = isAuthenticated();

  return (
    <HcLayout pageTitle={'Nav Info'}>
      <p>
        Nav is loaded for all users, however authenticated and anonymous users
        will have a different list. You are{' '}
        {authStatus ? <em>authenticated</em> : <em>anonymous</em>}.
      </p>
      <p>
        As of this work-in-progress implementation, anonymous users just get
        links to the top-level sites, and authenticated users get the full list
        of nav items regardless of authority level.
      </p>
      <pre>{JSON.stringify(navItems, undefined, 2)}</pre>
    </HcLayout>
  );
};

export default withHcAuth(NavInfoPage, SCOPE.PUBLIC);
