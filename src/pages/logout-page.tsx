import { useAuth } from '../context/hc-auth-context';
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { getConfig, SCOPE } from '../utils/hc-config';
import withHcAuth from '../hoc/with-hc-auth';

const LogoutPage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const config = getConfig();

  useEffect(() => {
    logout();
    navigate(config.LOGIN.POST_LOGOUT_PATH, {
      state: { from: 'Logged Out' },
    });
  }, [logout, navigate]);

  return <p>Logging you out of HedgeCourt</p>;
};

export default withHcAuth(LogoutPage, SCOPE.PUBLIC);
