import React from 'react';
import { useNavigate } from 'react-router-dom';
import withHcAuth from '../hoc/with-hc-auth';
import { SCOPE } from '../utils/hc-config';
import HcLayout from '../components/layout/hc-layout';
import { useAuth } from '../context/hc-auth-context';

const TestPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const authStatus = isAuthenticated();

  return (
    <HcLayout pageTitle={'Test Page'} browserTitle={'Test'}>
      <div>
        <div>
          This page requires you to be logged in:{' '}
          <span className={`hc-yeanay ${authStatus ? 'yea' : 'nay'}`}>
            {authStatus ? 'YES' : 'NO'}
          </span>
        </div>
        <p>
          <button onClick={() => navigate('/')}>Navigate Home</button>
        </p>
      </div>
    </HcLayout>
  );
};

export default withHcAuth(TestPage, SCOPE.LOGGED_IN);
