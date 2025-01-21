import React from 'react';
import { useAuth } from '../context/hc-auth-context';
import HcLayout from '../components/layout/hc-layout';
import withHcAuth from '../hoc/with-hc-auth';
import { SCOPE } from '../utils/hc-config';
import { useSite } from '../context/hc-site-context';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const { isAuthenticated } = useAuth();
  const { siteTitle } = useSite();
  const authStatus = isAuthenticated();

  return (
    <HcLayout
      pageTitle={`${siteTitle} Home`}
      browserTitle={'Home'}
      isHome={true}
    >
      <p>
        Welcome to HedgeCourt Apps, a collection of pages I built for fun,
        education, and portfolio purposes.
      </p>
      <p>
        HC Apps is an exploration in fullstack development:
        <ul>
          <li>Java SpringBoot API services</li>
          <li>Maven packages and repositories</li>
          <li>TypeScript React frontend applications</li>
          <li>Node.js packages and repositories</li>
          <li>GitHub Actions automated CI/CD pipelines</li>
          <li>Docker & Kubernetes deployment</li>
        </ul>
        Take a look at the GitHub repositories, the READMEs have more technical
        details:
        <ul>
          <li>
            <a
              href={'https://github.com/esasiela/hc-spring-monorepo'}
              target={'_blank'}
              rel={'noopener noreferrer'}
            >
              hc-spring-monorepo
            </a>{' '}
            - the Java Maven monorepo that provides <em>hc-spring-lib</em>, the
            common code for all HC Apps SpringBoot services, and{' '}
            <em>hc-spring-test</em>, a common test module that HC Apps can make
            use of. This repo is also the home of <em>hc-auth-api</em>, the
            microservice responsible for user management, authentication, and
            JWT generation & signing.
          </li>
          <li>
            <a
              href={'https://github.com/esasiela/hc-react-lib'}
              target={'_blank'}
              rel={'noopener noreferrer'}
            >
              hc-react-lib
            </a>{' '}
            - the TypeScript React repository that provides{' '}
            <em>hc-react-lib</em>, the common code for all HC Apps React
            frontend applications. This repo is also the home of
            <em>hc-home-apps</em>, the frontend application you're interacting
            with right now :-)
          </li>
        </ul>
      </p>

      {authStatus ? (
        <p>
          You are <em>authenticated</em>, you'll enjoy an enhanced experience.
        </p>
      ) : (
        <p>
          You are an <em>anonymous</em> user, you will enjoy the basic
          experience.
        </p>
      )}
      <p>
        Since this is a portfolio site to explore some capabilities, the
        difference between the anonymous and authenticated experience is
        minimal.
      </p>

      <h3>Test Page</h3>
      <p>
        The <Link to={'/test'}>Test Page</Link> requires an authenticated user.
        It does not have any specifically fun content, so if you are anonymous
        {authStatus ? (
          <em>(which you're not)</em>
        ) : (
          <em>(which you are)</em>
        )}{' '}
        you are not missing anything big, although you might enjoy the automatic
        trip to the login page. Normal design would have this link absent or
        disabled for users without access, but for illustration purposes it adds
        to the fun.
      </p>

      <h3>Nav Info Page</h3>
      <p>
        The <Link to={'/nav-info'}>Nav Info Page</Link> illustrates some raw
        JSON fetched from the Nav API. Since this is a work in progress, it's
        not too spectacular, but it is the building block for a dynamic
        navigation menu.
      </p>

      <h3>Build Info Page</h3>
      <p>
        The <Link to={'/build-info'}>Build Info Page</Link> is only for
        authenticated users with a specific access level. It shows some details
        about the backend service's build, helping diagnose environmental
        issues.
      </p>
    </HcLayout>
  );
};
export default withHcAuth(HomePage, SCOPE.PUBLIC);
