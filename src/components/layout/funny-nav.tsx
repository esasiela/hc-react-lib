import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/hc-auth-context';
import { SCOPE } from '../../utils/hc-config';
import HcYeaNayString from '../hc-yea-nay-string';

const FunnyNav = () => {
  const { hasScope, isAuthenticated } = useAuth();

  return (
    <div>
      <h3>Funny Nav</h3>
      <ul>
        <li>
          <Link to={'/'}>Home</Link> - Public page
        </li>
        <li>
          <Link to={'/test'}>Test Page</Link> - Requires a <em>login</em>. Are
          you logged in? <HcYeaNayString status={isAuthenticated()} />{' '}
        </li>
        <li>
          <Link to={'/build-info'}>Build Info</Link> - Requires{' '}
          <em>developer</em> access. Do you have it?{' '}
          <HcYeaNayString status={hasScope(SCOPE.DEVELOPER)} />
        </li>
      </ul>
    </div>
  );
};

export default FunnyNav;
