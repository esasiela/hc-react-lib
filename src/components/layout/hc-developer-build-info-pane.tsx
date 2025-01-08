import React, { useEffect, useState } from 'react';
import { getConfig } from '../../utils/hc-config';
import { useAuth } from '../../context/hc-auth-context';

const HcDeveloperBuildInfoPane: React.FC = () => {
  const { token } = useAuth();
  const [buildInfo, setBuildInfo] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();
  const config = getConfig();

  useEffect(() => {
    const fetchBuildInfo = async () => {
      try {
        const response = await fetch(
          config.LOGIN.LOGIN_API_URL + '/build-info',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + token,
            },
          }
        );
        if (!response.ok) {
          throw new Error('Failed to fetch build info.');
        }
        const data = await response.text();
        setBuildInfo(data);
      } catch (error_) {
        setError(error_ instanceof Error ? error_.message : 'Unknown error');
      }
    };

    fetchBuildInfo();
  }, [token]);

  return (
    <div className={'hc-dev-build-info-pane'}>
      <h3>Build Info</h3>
      {error ? <p style={{ color: 'red' }}>(error)</p> : <pre>{buildInfo}</pre>}
    </div>
  );
};

export default HcDeveloperBuildInfoPane;
