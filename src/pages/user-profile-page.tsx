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
      <p>
        As of this build, (A) there's no data to update, and (B) the backend is
        only using an H2 in-memory database, so when the Kubernetes pod shuts
        down, all changes are discarded.
      </p>
    </HcLayout>
  );
};

export default withHcAuth(HcUserProfilePage, SCOPE.LOGGED_IN);
