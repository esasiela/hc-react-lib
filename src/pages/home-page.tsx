import React from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../context/hc-auth-context';
import HcLayout from '../components/layout/hc-layout';
import withHcAuth from '../hoc/with-hc-auth';
import { SCOPE } from '../utils/hc-config';
import { useSite } from '../context/hc-site-context';

const handleClick = () => {
  console.log('Hello, World!');
  toast.info('Hello, World!');
};

const HomePage = () => {
  const { isAuthenticated } = useAuth();
  const { siteTitle } = useSite();
  const authStatus = isAuthenticated();

  return (
    <HcLayout pageTitle={`${siteTitle} Home`} browserTitle={'Home'}>
      <div>Welcome home, Friend. What a long, strange trip it's been.</div>
      <p>
        Public Access Toast: <button onClick={handleClick}>Toast</button>
      </p>
      {authStatus ? (
        <div>Test content for authenticated users.</div>
      ) : (
        <div>You are a public user, no special content for you.</div>
      )}
    </HcLayout>
  );
};
export default withHcAuth(HomePage, SCOPE.PUBLIC);
