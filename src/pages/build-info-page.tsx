import React, { useEffect, useState } from 'react';
import withHcAuth from '../hoc/with-hc-auth';
import { getConfig, SCOPE } from '../utils/hc-config';
import HcLayout from '../components/layout/hc-layout';
import { useAuth } from '../context/hc-auth-context';

const BuildInfoPage = () => {
  const { token } = useAuth();
  const [buildInfo, setBuildInfo] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();
  const config = getConfig();

  // TODO replace LOGIN_API_URL with AUTH_API_URL
  const buildInfoEndpoint = config.LOGIN.LOGIN_API_URL + '/build-info';

  useEffect(() => {
    const fetchBuildInfo = async () => {
      try {
        const response = await fetch(buildInfoEndpoint, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch build info');
        }
        const data = await response.text();
        setBuildInfo(data);
      } catch (error_) {
        setError(
          error_ instanceof Error
            ? error_.message
            : 'Unknown error fetching build info'
        );
      }
    };

    fetchBuildInfo();
  }, [token]);
  return (
    <HcLayout pageTitle={'Build Info'}>
      <p>
        The the build info page code is included in the hc-react-lib package.
        Each HC App that has an API service is expected to provide a{' '}
        <em>/build-info</em> endpoint that requires <em>developer</em> scope.
      </p>
      <p>
        This implies that each app needs to provide an API service base url to
        this page so he knows what to fetch. The current implementation just
        uses HC Auth base url <em>{buildInfoEndpoint}</em>, so any HC App with a
        route to this page will show the same thing.
      </p>
      {error ? <p style={{ color: 'red' }}>(error)</p> : <pre>{buildInfo}</pre>}
    </HcLayout>
  );
};

export default withHcAuth(BuildInfoPage, SCOPE.DEVELOPER);
