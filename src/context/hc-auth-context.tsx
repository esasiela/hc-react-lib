import { jwtDecode, JwtPayload } from 'jwt-decode';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import User from '../models/user';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  isAuthenticated: () => boolean;
  hasScope: (scope: string | undefined) => boolean;
  authUser: User | undefined;
  token: string | undefined;
  login: (newToken: string) => void;
  logout: () => void;
  isAuthLoading: boolean;
}

const HcAuthContext = createContext<AuthContextType | undefined>(undefined);

function isTokenExpired(token: string): boolean {
  const decoded: JwtPayload = jwtDecode<JwtPayload>(token);
  const currentTime = Math.floor(Date.now() / 1000);
  return !decoded.exp || decoded.exp < currentTime;
}

export const HcAuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated_, setIsAuthenticated_] = useState(false);
  const [token, setToken] = useState<string | undefined>();
  const [authUser, setAuthUser] = useState<User | undefined>();
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const savedToken = localStorage.getItem('jwt');
    if (savedToken) {
      if (isTokenExpired(savedToken)) {
        // TODO implement refresh tokens
        console.log('hcAuthProvider - jwt in localstorage is expired');
        logout();
      } else {
        // TODO validate the jwt signature?
        console.log('hcAuthProvider - jwt in localstorage is not expired');
        setToken(savedToken);
        const newUser = User.fromToken(savedToken);
        setAuthUser(newUser);
        setIsAuthenticated_(true);
      }
    } else {
      console.log('hcAuthProvider - no jwt in localStorage');
      logout();
    }
    setIsAuthLoading(false);
  }, [navigate]);

  const login = (newToken: string): void => {
    localStorage.setItem('jwt', newToken);
    setToken(newToken);
    const newUser: User = User.fromToken(newToken);
    setAuthUser(newUser);
    setIsAuthenticated_(true);
  };

  const logout = (): void => {
    localStorage.removeItem('jwt');
    setToken(undefined);
    setAuthUser(undefined);
    setIsAuthenticated_(false);
  };

  const isAuthenticated = (): boolean => {
    // TODO validate token expiry
    return isAuthenticated_;
  };

  const hasScope = (scope: string | undefined): boolean => {
    // TODO validate token expiry
    return !!(
      scope &&
      authUser &&
      authUser.scopes &&
      authUser.scopes.includes(scope)
    );
  };

  return (
    <HcAuthContext.Provider
      value={{
        isAuthenticated,
        hasScope,
        authUser,
        token,
        login,
        logout,
        isAuthLoading,
      }}
    >
      {children}
    </HcAuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(HcAuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { HcAuthContext };
