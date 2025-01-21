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
          This page requires you to be logged in, so I really hope you see a
          pretty YES after this:{' '}
          <span className={`hc-yeanay ${authStatus ? 'yea' : 'nay'}`}>
            {authStatus ? 'YES' : 'NO'}
          </span>
        </div>
        <p>
          A simple use of <em>react-router-dom.useNavigate</em> to help me debug
          the nesting of components in my Layout class:
        </p>
        <p>
          <button onClick={() => navigate('/')}>Navigate Home</button>
        </p>
      </div>
    </HcLayout>
  );
};

export default withHcAuth(TestPage, SCOPE.LOGGED_IN);
