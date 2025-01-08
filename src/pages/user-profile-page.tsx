import React from 'react';
import withHcAuth from '../hoc/with-hc-auth';
import { SCOPE } from '../utils/hc-config';
import HcLayout from '../components/layout/hc-layout';
import { useAuth } from '../context/hc-auth-context';

const HcUserProfilePage = () => {
  const { authUser } = useAuth();

  return (
    <HcLayout pageTitle={'User Profile'}>
      <p>
        Update your profile, <em>{authUser?.username}</em>
      </p>
    </HcLayout>
  );
};

export default withHcAuth(HcUserProfilePage, SCOPE.LOGGED_IN);
