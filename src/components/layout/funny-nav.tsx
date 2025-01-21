import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/hc-auth-context';
import { SCOPE } from '../../utils/hc-config';
import HcYeaNayString from '../hc-yea-nay-string';
import { useSite } from '../../context/hc-site-context';

const FunnyNav = () => {
  const { hasScope, isAuthenticated } = useAuth();
  const { navItems } = useSite();

  return (
    <div>
      <h3>Super Fun Navigator</h3>
      Hardcoded list of links for both authenticated and anonymous users:
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
          <em>{SCOPE.DEVELOPER_READ}</em> access. Do you have it?{' '}
          <HcYeaNayString status={hasScope(SCOPE.DEVELOPER_READ)} />
        </li>
        <li>
          <Link to={'/nav-info'}>Nav Info</Link> - Public page
        </li>
      </ul>
      Dynamic list of links that reflects to your access level. A work in
      progress, right now anonymous users just get links to the top-level sites,
      and authenticated users get the full list of nav items regardless of
      authority level:
      <ul>
        {navItems.map((item) => (
          <li key={item.id}>
            <a href={`${item.publicUrl}${item.path}`}>{item.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FunnyNav;
