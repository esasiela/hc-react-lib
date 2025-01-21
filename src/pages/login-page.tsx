import React, { useEffect, useState } from 'react';
import { getConfig, SCOPE } from '../utils/hc-config';
import { useAuth } from '../context/hc-auth-context';
import HcLayout from '../components/layout/hc-layout';
import { useNavigate } from 'react-router-dom';
import withHcAuth from '../hoc/with-hc-auth';

interface LoginError {
  message: string;
}

const LoginPage = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<LoginError | undefined>(); // Type the error state
  const navigate = useNavigate();
  const config = getConfig();

  // Set default credentials if enabled
  useEffect(() => {
    if (config.LOGIN.DEFAULT_ENABLE) {
      setUsername(config.LOGIN.DEFAULT_USER);
      setPassword(config.LOGIN.DEFAULT_PASS);
    }
  }, [config.LOGIN.DEFAULT_ENABLE]);

  const handleProfileClick =
    (username: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      console.log('populating profile:', username, config.LOGIN.PUBLIC_PASS);
      setUsername(username);
      setPassword(config.LOGIN.PUBLIC_PASS);
    };

  const handleSubmit = async (formEvent: React.FormEvent) => {
    formEvent.preventDefault();

    try {
      // TODO replace login POST with swagger-typescript-api client
      const response = await fetch(
        config.LOGIN.LOGIN_API_URL + config.LOGIN.LOGIN_PATH,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        }
      );

      if (response.ok) {
        console.log('Response OK, login was a success');
        const data = await response.json();
        login(data.token);
        navigate(config.LOGIN.POST_LOGIN_ROUTE, {
          state: { from: 'Logged In' },
        });
      } else {
        console.log('Response not OK, login failed');
        const errorData = (await response.json()) as LoginError;
        setError(errorData || { message: 'LoginPage failed' });
      }
    } catch (error_) {
      console.log('Error Logging In:', error_);
      setError({
        message:
          'An error occurred while logging in: ' + (error_ as Error).message,
      });
    }
  };

  return (
    <HcLayout pageTitle={'Login'}>
      <div style={{ marginBottom: '15px' }}>
        A normal site would never give away free logins without some kind of
        registration process. However this is a demo site for fun, so feel free
        to select one of these profiles:
        <ul>
          <li>
            <a href={'#'} onClick={handleProfileClick('publicBase')}>
              publicBase
            </a>{' '}
            - basic user with no special authorization
          </li>
          <li>
            {' '}
            <a href={'#'} onClick={handleProfileClick('publicDev')}>
              publicDev
            </a>{' '}
            - the good stuff, a user with <em>{SCOPE.DEVELOPER_READ}</em>
          </li>
        </ul>
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          {' '}
          <div className={'hc-form-group'}>
            <label htmlFor={'username'}>Username</label>
            <input
              type={'text'}
              id={'username'}
              value={username}
              onChange={(fieldChangeEvent) =>
                setUsername(fieldChangeEvent.target.value)
              }
              required
            />
          </div>
          <div className={'hc-form-group'}>
            <label htmlFor={'password'}>Password</label>
            <input
              type={'password'}
              id={'password'}
              value={password}
              onChange={(fieldChangeEvent) =>
                setPassword(fieldChangeEvent.target.value)
              }
              required
            />
          </div>
          {error && <p style={{ color: 'red' }}>{error.message}</p>}
          <button type={'submit'}>Login</button>
        </div>
      </form>
    </HcLayout>
  );
};

export default withHcAuth(LoginPage, SCOPE.PUBLIC);
